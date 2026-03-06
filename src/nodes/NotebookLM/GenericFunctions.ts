import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';

/**
 * Make an API request to the NotebookLM MCP server
 */
export async function notebookLmApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	path: string,
	body: any = {},
	i: number,
): Promise<any> {
	const credentials = await this.getCredentials('notebookLMApi') as {
		serverUrl: string;
		apiKey: string;
	};

	const baseUrl = credentials.serverUrl.endsWith('/mcp')
		? credentials.serverUrl.replace('/mcp', '')
		: credentials.serverUrl;

	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json',
	};

	if (credentials.apiKey) {
		headers['X-API-Key'] = credentials.apiKey;
	}

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${path}`,
		headers,
		body,
		json: true,
	};

	return await this.helpers.httpRequest(options);
}

/**
 * Make a JSON-RPC request to the MCP tool endpoint
 */
export async function notebookLmMcpRequest(
	this: IExecuteFunctions,
	toolName: string,
	args: IDataObject,
	i: number,
): Promise<any> {
	const credentials = await this.getCredentials('notebookLMApi') as {
		serverUrl: string;
		apiKey: string;
	};

	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json',
	};

	if (credentials.apiKey) {
		headers['X-API-Key'] = credentials.apiKey;
	}

	const body = {
		jsonrpc: '2.0',
		id: i,
		method: 'tools/call',
		params: {
			name: toolName,
			arguments: args,
		},
	};

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: credentials.serverUrl,
		headers,
		body,
		json: true,
	};

	return await this.helpers.httpRequest(options);
}
