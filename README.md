# n8n-nodes-notebooklm

[Português (Brasil)](./README.pt-BR.md) | English

This is an n8n community node that allows you to interact with Google NotebookLM via an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server.

---

## ⚡ Quick Start (Easy Mode)

For users who want to get up and running in minutes:

### 1. Deploy the Server (VPS)

If you use **Easypanel**, you can use our **1-Click Blueprint**:

1. In your Easypanel, go to **Projects** -> **Create New**.
2. Select **App** -> **Github**.
3. Use this repo: `guilhermeverdoodt/n8n-nodes-notebooklm-mcp`
4. In **Environment Variables**, paste your Google Cookies and a secret API Key.

_Check [easypanel-blueprint.json](./easypanel-blueprint.json) for reference._

### 2. Install the Node (n8n)

In your n8n: **Settings** -> **Community Nodes** -> **Install** -> `n8n-nodes-notebooklm`.

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

## 🚢 VPS Deployment (Easypanel + GitHub Integration)

This is the recommended way to host your own private NotebookLM MCP server:

1. **Connect GitHub**: In Easypanel, go to **Settings** and ensure your **GitHub Token** is configured (required for private repos).
2. **Create App**: Choose **App** -> **Github**.
3. **App Details**:
   - **Repository**: `guilhermeverdoodt/n8n-nodes-notebooklm-mcp` (or your fork)
   - **Branch**: `main`
   - **Build Path**: `/`
4. **Build Config**:
   - **Build Method**: `Dockerfile`
   - **Docker Context**: `./`
   - **Dockerfile Path**: `Dockerfile`
5. **Environment Variables**:
   - `NOTEBOOKLM_COOKIES`: Copy from your local `cookies.json`.
   - `NOTEBOOKLM_API_KEY`: Set a strong secret key for authentication.
6. **Networking**:
   - **Port**: `8000`
   - **Domain**: Define your subdomain (e.g., `mcp.your-domain.com`).
   - (Optional) Enable **Basic Auth** middleware for extra security.

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

## 🤖 AI Automation Guide

This node is optimized for AI Agents and automation. Use **Smart List Flattening** to connect your agent to your NotebookLM knowledge effectively:

### Dynamic Knowledge Selection

Instead of hardcoding IDs, you can find notebooks by their name:

1. **List Notebooks**: Use the `Notebook: List` operation.
2. **Filter**: Add a native n8n **Filter** node to match the `title` (e.g., _title equals "My Knowledge Base"_).
3. **Connect Agent**: In the next node (e.g., `Notebook: Query`), set the **Notebook ID** as an expression: `{{ $json.id }}`.

This allows your agent to always point to the correct knowledge even if you rename or recreate notebooks.

---

## 🔧 Troubleshooting

### ❌ `Service is not reachable` (Easypanel)

The server is binding to `127.0.0.1` inside the container. Ensure your `Dockerfile` CMD includes `--host 0.0.0.0`:

```
CMD ["notebooklm-mcp", "--transport", "http", "--host", "0.0.0.0", "--port", "8000"]
```

### ❌ `Not Acceptable: Client must accept text/event-stream`

This happens when the n8n node makes requests without the required `Accept` header for the MCP streamable-http protocol. **Update the node** to the latest version:

- If installed via Community Nodes: **Uninstall → Reinstall** `n8n-nodes-notebooklm`.
- If developing locally: run `npm run build` and restart n8n.

### ❌ `AttributeError: 'FastMCP' object has no attribute 'starlette_app'`

The `pip`-installed version of `FastMCP` inside Docker uses `app` instead of `starlette_app`. This is fixed in version `>= 0.1.0` of this package.

### ✅ Testing Without the n8n Node

You can validate the server is working correctly using the REST endpoints directly:

```bash
# Health check
curl https://your-domain.easypanel.host/health

# List notebooks (add -H "X-API-Key: your-key" if configured)
curl https://your-domain.easypanel.host/api/notebooks
```

### 📦 Applying n8n Node Updates

The n8n node is not auto-updated. After any code change, you must **publish a new version to npm** and reinstall it via Community Nodes:

```bash
npm version patch   # bump version
npm publish --access public
```

---

## License

[MIT](LICENSE)
