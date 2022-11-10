import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { IssuerRevocationRegistry } from '../models/issuer-revocation-registry';
import { RevokeRequest } from '../models/revoke-request';

@Injectable()
export class RevocationService {

  constructor(private http: HttpClient) {
  }

  getActiveRegistry(agent: AgentTemplate, credentialDefinitionId: string): Observable<IssuerRevocationRegistry> {
    return this.http.get<any>(`${agent.url}/revocation/active-registry/${credentialDefinitionId}`).pipe(map(dto => {
      return IssuerRevocationRegistry.fromDto(dto);
    }));
  }

  revoke(agent: AgentTemplate, revokeRequest: RevokeRequest): Observable<void> {
    const subject = new Subject<void>();
    let payload: any = {};
    if (revokeRequest.comment) payload['comment'] = revokeRequest.comment;
    if (revokeRequest.connectionId) payload['connection_id'] = revokeRequest.connectionId;
    if (revokeRequest.credentialExchangeId) payload['cred_ex_id'] = revokeRequest.credentialExchangeId;
    if (revokeRequest.notifyVersion) payload['notify_version'] = revokeRequest.notifyVersion;
    if (revokeRequest.revocationRegistryIdentifier) payload['rev_reg_id'] = revokeRequest.revocationRegistryIdentifier;
    if (revokeRequest.threadId) payload['thread_id'] = revokeRequest.threadId;
    this.http.post<any>(`${agent.url}/revocation/revoke`, payload).subscribe(
      {
        next: () => {
          subject.next();
        },
        error: (error) => {
          subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }
}