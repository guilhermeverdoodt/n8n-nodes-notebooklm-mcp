# n8n-nodes-notebooklm

This is an n8n community node that allows you to interact with Google NotebookLM via an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server.

---

## 🏁 Overview: NotebookLM + n8n Integration

This project provides a complete and secure bridge between Google NotebookLM's capabilities and n8n.

### ✅ What's included:

- **Enhanced MCP Server (Python)**: Supports HTTP/SSE/Stdio transports, REST Gateway endpoints (`/api/notebooks`, `/api/query`), and native `X-API-Key` security.
- **Native n8n Node**: Features a secure Credentials system and supports over 100% of NotebookLM features (Notebooks, Sources, Notes, Studio, Artifacts, Sharing, and Exports).
- **Deployment Ready**: Includes a `Dockerfile` and guides for VPS hosting (Easypanel).

---

## 🚀 Installation & Setup

### 1. Install the Community Node

Follow the [n8n community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).
In your n8n instance:

1. Go to **Settings > Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-notebooklm`.

### 2. Run the MCP Server

The node requires a NotebookLM MCP server running in HTTP mode.

```bash
notebooklm-mcp --transport http --port 8000
```

_Note: Ensure you have authenticated via `nlm login` first._

---

## 🔒 Credentials & Security

This node uses a **NotebookLM MCP API** credential type for security.

1. **Server URL**: The full URL to your MCP server (e.g., `https://mcp.your-domain.com/mcp`).
2. **API Key**: The secret key configured on your server via the `NOTEBOOKLM_API_KEY` environment variable.

---

## ✨ Features

- **Notebooks**: Create, List, Rename, Delete, Describe, and Deep Research.
- **Sources**: Add (URL, Text, Drive, Local File), List, Delete, and Sync.
- **Notes**: Full CRUD (Create, Read, Update, Delete) for notes within notebooks.
- **Chat/Query**: Ask questions to your notebooks with AI-powered citations.
- **Studio**: Create Audio Overviews (Podcasts), YouTube scripts, FAQs, and more.
- **Artifacts**: List and Download generated files (Audio, PDF, etc.).
- **Sharing**: Manage sharing status, invite collaborators, and set public access.
- **Exports**: Export notebook content to Google Docs or Google Sheets.

---

## 🚢 VPS Deployment (Easypanel)

1. **Create App**: Choose "App" -> "Github" or "Git Repository".
2. **Build Config**: Build Method: `Dockerfile`, Context: `./`, Path: `Dockerfile`.
3. **Environment Variables**:
   - `NOTEBOOKLM_COOKIES`: Copy from your local `cookies.json`.
   - `NOTEBOOKLM_API_KEY`: Set a strong secret key.
4. **Networking**: Port `8000`.

---

## 🛠️ Local Development & Publishing

### Local Testing

```bash
npm install
npm run build
npm link
# In n8n directory:
npm link n8n-nodes-notebooklm
```

### Publishing to npm

1. `npm login`
2. `npm publish --access public`

---

## License

[MIT](LICENSE)
