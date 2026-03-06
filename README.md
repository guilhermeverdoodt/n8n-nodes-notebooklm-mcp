# n8n-nodes-notebooklm-mcp

An **n8n community node** to interact with **Google NotebookLM** — list notebooks, query knowledge, manage sources, generate audio overviews, and more.

[🇧🇷 Leia em Português](./README.pt-BR.md) | [GitHub Repository](https://github.com/guilhermeverdoodt/n8n-nodes-notebooklm-mcp)

---

## Prerequisites

This node requires a **NotebookLM MCP server** running in HTTP mode. You can self-host it:

[![Deploy on Easypanel](https://easypanel.io/img/deploy-on-easypanel.svg)](https://github.com/guilhermeverdoodt/n8n-nodes-notebooklm-mcp)

Or run locally:

```bash
pip install notebooklm-mcp-cli
nlm login
notebooklm-mcp --transport http --host 0.0.0.0 --port 8000
```

---

## Installation

In your n8n instance:

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-notebooklm-mcp`

---

## Configuration

Create a **NotebookLM MCP API** credential with:

| Field          | Description                                           | Example                           |
| -------------- | ----------------------------------------------------- | --------------------------------- |
| **Server URL** | Full URL to your MCP server endpoint                  | `https://mcp.your-domain.com/mcp` |
| **API Key**    | Secret key set via `NOTEBOOKLM_API_KEY` on the server | `my-secret-key`                   |

---

## Available Operations

| Resource     | Operations                                           |
| ------------ | ---------------------------------------------------- |
| **Notebook** | List, Get, Create, Rename, Delete, Describe          |
| **Source**   | Add (URL / Text / Drive / File), List, Delete, Sync  |
| **Note**     | Create, List, Update, Delete                         |
| **Chat**     | Query (ask questions with AI citations)              |
| **Studio**   | Create Audio Overview, FAQ, Briefing, YouTube Script |
| **Artifact** | List, Download                                       |
| **Sharing**  | Get Status, Invite, Set Public Access                |
| **Export**   | To Google Docs, To Google Sheets                     |
| **Research** | Deep Research across sources                         |

---

## AI Automation Guide

Use **Smart List Flattening** to connect the node to your AI agents dynamically:

1. **Notebook: List** → Returns each notebook as a separate n8n item.
2. **Filter** (native n8n node) → Match by `title` to find the right notebook.
3. **Notebook: Query** → Use `{{ $json.id }}` as the Notebook ID expression.

This way your agent always finds the correct notebook by name, even if it gets recreated.

---

## Troubleshooting

| Error                               | Fix                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| `Service is not reachable`          | Ensure your server uses `--host 0.0.0.0`                                            |
| `Not Acceptable: text/event-stream` | Reinstall the node to get the latest version                                        |
| `AttributeError: starlette_app`     | Update the server package: `pip install -U notebooklm-mcp-cli`                      |
| `Invalid or missing X-API-Key`      | Check the API Key in your n8n credential matches `NOTEBOOKLM_API_KEY` on the server |

For detailed deployment guides, visit the [GitHub repository](https://github.com/guilhermeverdoodt/n8n-nodes-notebooklm-mcp).

---

## License

[MIT](LICENSE) — Made with ❤️ by [Guilherme Verdoodt](https://github.com/guilhermeverdoodt) / [KortX](https://kortx.io)
