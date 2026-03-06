import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import { notebookLmMcpRequest } from './GenericFunctions';

export class NotebookLM implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NotebookLM',
		name: 'notebookLM',
		icon: 'file:notebooklm.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with Google NotebookLM via MCP',
		defaults: {
			name: 'NotebookLM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'notebookLMApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Artifact', value: 'artifact' },
					{ name: 'Export', value: 'export' },
					{ name: 'Note', value: 'note' },
					{ name: 'Notebook', value: 'notebook' },
					{ name: 'Sharing', value: 'sharing' },
					{ name: 'Source', value: 'source' },
					{ name: 'Studio', value: 'studio' },
				],
				default: 'notebook',
			},

			// ----------------------------------
			//         Notebook Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['notebook'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a notebook' },
					{ name: 'Deep Research', value: 'deepResearch', action: 'Run deep research' },
					{ name: 'Delete', value: 'delete', action: 'Delete a notebook' },
					{ name: 'Describe', value: 'describe', action: 'Describe a notebook' },
					{ name: 'Get', value: 'get', action: 'Get a notebook' },
					{ name: 'List', value: 'list', action: 'List all notebooks' },
					{ name: 'Query', value: 'query', action: 'Ask a question' },
					{ name: 'Rename', value: 'rename', action: 'Rename a notebook' },
				],
				default: 'list',
			},

			// ----------------------------------
			//         Source Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['source'] } },
				options: [
					{ name: 'Add', value: 'add', action: 'Add a source' },
					{ name: 'Delete', value: 'delete', action: 'Delete a source' },
					{ name: 'Get', value: 'get', action: 'Get a source' },
					{ name: 'List', value: 'list', action: 'List all sources' },
					{ name: 'Sync', value: 'sync', action: 'Sync sources' },
				],
				default: 'list',
			},

			// ----------------------------------
			//         Note Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['note'] } },
				options: [
					{ name: 'Create', value: 'create', action: 'Create a note' },
					{ name: 'Delete', value: 'delete', action: 'Delete a note' },
					{ name: 'Get', value: 'get', action: 'Get a note' },
					{ name: 'List', value: 'list', action: 'List all notes' },
					{ name: 'Update', value: 'update', action: 'Update a note' },
				],
				default: 'list',
			},

			// ----------------------------------
			//         Studio Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['studio'] } },
				options: [
					{ name: 'Create Artifact', value: 'create', action: 'Create a studio artifact' },
					{ name: 'Delete', value: 'delete', action: 'Delete a studio job' },
					{ name: 'List', value: 'list', action: 'List studio jobs' },
					{ name: 'Revise', value: 'revise', action: 'Revise a slide' },
					{ name: 'Status', value: 'status', action: 'Get studio job status' },
				],
				default: 'list',
			},

			// ----------------------------------
			//         Artifact Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['artifact'] } },
				options: [
					{ name: 'Download', value: 'download', action: 'Download an artifact' },
					{ name: 'List', value: 'list', action: 'List artifacts' },
				],
				default: 'list',
			},

			// ----------------------------------
			//         Sharing Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['sharing'] } },
				options: [
					{ name: 'Get Status', value: 'getStatus', action: 'Get sharing status' },
					{ name: 'Invite', value: 'invite', action: 'Invite a user' },
					{ name: 'Set Public', value: 'setPublic', action: 'Set public access' },
				],
				default: 'getStatus',
			},

			// ----------------------------------
			//         Export Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['export'] } },
				options: [
					{ name: 'To Google Docs', value: 'toDocs', action: 'Export to Google Docs' },
					{ name: 'To Google Sheets', value: 'toSheets', action: 'Export to Google Sheets' },
				],
				default: 'toDocs',
			},

			// ----------------------------------
			//         Shared Parameters
			// ----------------------------------
			{
				displayName: 'Notebook ID',
				name: 'notebookId',
				type: 'string',
				required: true,
				displayOptions: {
					hide: {
						resource: ['notebook'],
						operation: ['list', 'create'],
					},
				},
				default: '',
			},

			// Parameters for Notebook Resource
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: { show: { resource: ['notebook'], operation: ['create', 'rename'] } },
				default: '',
			},
			{
				displayName: 'Question',
				name: 'query',
				type: 'string',
				displayOptions: { show: { resource: ['notebook'], operation: ['query', 'deepResearch'] } },
				default: '',
			},

			// Parameters for Source Resource
			{
				displayName: 'Source ID',
				name: 'sourceId',
				type: 'string',
				displayOptions: { show: { resource: ['source'], operation: ['get', 'delete'] } },
				default: '',
			},
			{
				displayName: 'Source Type',
				name: 'sourceType',
				type: 'options',
				displayOptions: { show: { resource: ['source'], operation: ['add'] } },
				options: [
					{ name: 'URL', value: 'url' },
					{ name: 'Text', value: 'text' },
					{ name: 'Google Drive', value: 'drive' },
					{ name: 'Local File', value: 'file' },
				],
				default: 'url',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				displayOptions: { show: { resource: ['source'], operation: ['add'], sourceType: ['url'] } },
				default: '',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 4 },
				displayOptions: { show: { resource: ['source'], operation: ['add'], sourceType: ['text'] } },
				default: '',
			},
			{
				displayName: 'Document ID (Drive)',
				name: 'documentId',
				type: 'string',
				displayOptions: { show: { resource: ['source'], operation: ['add'], sourceType: ['drive'] } },
				default: '',
			},
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				displayOptions: { show: { resource: ['source'], operation: ['add'], sourceType: ['file'] } },
				default: '',
			},

			// Parameters for Note Resource
			{
				displayName: 'Note ID',
				name: 'noteId',
				type: 'string',
				displayOptions: { show: { resource: ['note'], operation: ['get', 'update', 'delete'] } },
				default: '',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: { rows: 4 },
				displayOptions: { show: { resource: ['note'], operation: ['create', 'update'] } },
				default: '',
			},

			// Parameters for Studio Resource
			{
				displayName: 'Artifact Type',
				name: 'artifactType',
				type: 'options',
				displayOptions: { show: { resource: ['studio'], operation: ['create'] } },
				options: [
					{ name: 'Audio Overview', value: 'audio' },
					{ name: 'Briefing Doc', value: 'briefing_doc' },
					{ name: 'FAQ', value: 'faq' },
					{ name: 'Flashcards', value: 'flashcards' },
					{ name: 'Guide', value: 'guide' },
					{ name: 'Quiz', value: 'quiz' },
					{ name: 'Table of Contents', value: 'table_of_contents' },
					{ name: 'Timeline', value: 'timeline' },
					{ name: 'YouTube Video', value: 'video' },
				],
				default: 'audio',
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				displayOptions: { show: { resource: ['studio'], operation: ['status', 'delete'] } },
				default: '',
			},

			// Parameters for Artifact Resource
			{
				displayName: 'Artifact ID',
				name: 'artifactId',
				type: 'string',
				displayOptions: { show: { resource: ['artifact'], operation: ['download'] } },
				default: '',
			},
			{
				displayName: 'Output Path',
				name: 'outputPath',
				type: 'string',
				displayOptions: { show: { resource: ['artifact'], operation: ['download'] } },
				default: '',
				description: 'Where to save the file on the MCP server host',
			},

			// Parameters for Sharing Resource
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: { show: { resource: ['sharing'], operation: ['invite'] } },
				default: '',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				displayOptions: { show: { resource: ['sharing'], operation: ['invite'] } },
				options: [
					{ name: 'Viewer', value: 'READER' },
					{ name: 'Editor', value: 'WRITER' },
					{ name: 'Owner', value: 'OWNER' },
				],
				default: 'READER',
			},
			{
				displayName: 'Public Access',
				name: 'public',
				type: 'boolean',
				displayOptions: { show: { resource: ['sharing'], operation: ['setPublic'] } },
				default: false,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let toolName = '';
				let args: IDataObject = {};

				if (resource === 'notebook') {
					if (operation === 'list') toolName = 'notebook_list';
					else if (operation === 'create') {
						toolName = 'notebook_create';
						args.title = this.getNodeParameter('title', i);
					} else if (operation === 'get') {
						toolName = 'notebook_get';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'describe') {
						toolName = 'notebook_describe';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'delete') {
						toolName = 'notebook_delete';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'rename') {
						toolName = 'notebook_rename';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.title = this.getNodeParameter('title', i);
					} else if (operation === 'query') {
						toolName = 'notebook_query';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.query = this.getNodeParameter('query', i);
					} else if (operation === 'deepResearch') {
						toolName = 'notebook_deep_research';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.query = this.getNodeParameter('query', i);
					}
				} else if (resource === 'source') {
					if (operation === 'list') {
						toolName = 'source_list';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'add') {
						toolName = 'source_add';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.source_type = this.getNodeParameter('sourceType', i);
						if (args.source_type === 'url') args.url = this.getNodeParameter('url', i);
						else if (args.source_type === 'text') args.text = this.getNodeParameter('text', i);
						else if (args.source_type === 'drive') args.document_id = this.getNodeParameter('documentId', i);
						else if (args.source_type === 'file') args.file_path = this.getNodeParameter('filePath', i);
					} else if (operation === 'get') {
						toolName = 'source_get';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.source_id = this.getNodeParameter('sourceId', i);
					} else if (operation === 'delete') {
						toolName = 'source_delete';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.source_id = this.getNodeParameter('sourceId', i);
					} else if (operation === 'sync') {
						toolName = 'source_sync';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					}
				} else if (resource === 'note') {
					if (operation === 'list') {
						toolName = 'note_list';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'create') {
						toolName = 'note_create';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.content = this.getNodeParameter('content', i);
					} else if (operation === 'get') {
						toolName = 'note_get';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.note_id = this.getNodeParameter('noteId', i);
					} else if (operation === 'update') {
						toolName = 'note_update';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.note_id = this.getNodeParameter('noteId', i);
						args.content = this.getNodeParameter('content', i);
					} else if (operation === 'delete') {
						toolName = 'note_delete';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.note_id = this.getNodeParameter('noteId', i);
					}
				} else if (resource === 'studio') {
					if (operation === 'create') {
						toolName = 'studio_create';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.artifact_type = this.getNodeParameter('artifactType', i);
					} else if (operation === 'status') {
						toolName = 'studio_status';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.job_id = this.getNodeParameter('jobId', i);
					} else if (operation === 'list') {
						toolName = 'studio_list';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'delete') {
						toolName = 'studio_delete';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.job_id = this.getNodeParameter('jobId', i);
					}
				} else if (resource === 'artifact') {
					if (operation === 'list') {
						toolName = 'artifact_list';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'download') {
						toolName = 'download_artifact';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.artifact_id = this.getNodeParameter('artifactId', i);
						args.output_path = this.getNodeParameter('outputPath', i);
					}
				} else if (resource === 'sharing') {
					if (operation === 'getStatus') {
						toolName = 'notebook_share_status';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'setPublic') {
						toolName = 'notebook_share_public';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.public = this.getNodeParameter('public', i);
					} else if (operation === 'invite') {
						toolName = 'notebook_share_invite';
						args.notebook_id = this.getNodeParameter('notebookId', i);
						args.email = this.getNodeParameter('email', i);
						args.role = this.getNodeParameter('role', i);
					}
				} else if (resource === 'export') {
					if (operation === 'toDocs') {
						toolName = 'export_to_docs';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					} else if (operation === 'toSheets') {
						toolName = 'export_to_sheets';
						args.notebook_id = this.getNodeParameter('notebookId', i);
					}
				}

				const response = await notebookLmMcpRequest.call(this, toolName, args, i);

				// Smart flattening: If the response contains a known list, return items individually
				// This makes it much easier to use in n8n (filters, loops, etc.)
				const listKeys = ['notebooks', 'sources', 'notes', 'jobs', 'artifacts'];
				let flattened = false;

				for (const key of listKeys) {
					if (response && Array.isArray(response[key])) {
						for (const listItem of response[key]) {
							// Merge global status/metadata if helpful
							const itemData = {
								...(listItem as IDataObject),
								_parent_status: response.status,
							};
							returnData.push({ json: itemData });
						}
						flattened = true;
						break;
					}
				}

				if (!flattened) {
					returnData.push({ json: response });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
