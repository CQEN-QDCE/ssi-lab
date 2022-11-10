export class IssueCredential {

    id: string;
    name: string;
    credentialPreview: any;
    revoked: boolean;
    credentialExchangeId: string;
    agentTemplateId: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.credentialPreview = '';
        this.revoked = false;
        this.credentialExchangeId = '';
        this.agentTemplateId = '';
    }

    static fromDto(dto: any): IssueCredential {
        const issueCredential = new IssueCredential();
        
        issueCredential.id = dto.id;
        issueCredential.name = dto.name;
        issueCredential.credentialPreview = dto.credentialPreview;
        issueCredential.revoked = dto.revoked;
        issueCredential.credentialExchangeId = dto.credentialExchangeId;
        issueCredential.agentTemplateId = dto.agentTemplateId;
        
        return issueCredential;
    }
}
