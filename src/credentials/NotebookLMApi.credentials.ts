import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NotebookLMApi implements ICredentialType {
	name = 'notebookLMApi';
	displayName = 'NotebookLM MCP API';
	// docsUrl = 'https://github.com/jacob-bd/notebooklm-mcp-cli';
	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'http://localhost:8000/mcp',
			placeholder: 'https://mcp.your-domain.com/mcp',
			required: true,
			description: 'The URL of your NotebookLM MCP server (HTTP transport)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API Key for the NotebookLM MCP server (X-API-Key header)',
		},
	];
}
