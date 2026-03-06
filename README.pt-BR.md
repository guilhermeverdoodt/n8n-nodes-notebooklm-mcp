# n8n-nodes-notebooklm

Este é um nó de comunidade para o n8n que permite interagir com o Google NotebookLM através de um servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io).

---

## ⚡ Início Rápido (Modo Fácil)

Para usuários que querem começar em minutos:

### 1. Implantar o Servidor (VPS)

Se você usa o **Easypanel**, pode usar nosso **Blueprint de 1-Clique**:

1. No seu Easypanel, vá em **Projects** -> **Create New**.
2. Selecione **App** -> **Github**.
3. Use este repositório: `guilhermeverdoodt/kortx`
4. Nas **Variáveis de Ambiente**, cole seus cookies do Google e uma Chave de API secreta.

_Consulte [easypanel-blueprint.json](./easypanel-blueprint.json) para referência._

### 2. Instalar o Nó (n8n)

No seu n8n: **Settings** -> **Community Nodes** -> **Install** -> Digite `n8n-nodes-notebooklm`.

---

## 🏁 Visão Geral: Integração NotebookLM + n8n

Este projeto fornece uma ponte completa e segura entre as capacidades do Google NotebookLM e o n8n.

### ✅ O que está incluído:

- **Servidor MCP Aprimorado (Python)**: Suporta transportes HTTP/SSE/Stdio, endpoints REST Gateway (`/api/notebooks`, `/api/query`) e segurança nativa via `X-API-Key`.
- **Nó Nativo n8n**: Possui um sistema de Credenciais seguro e suporta 100% dos recursos do NotebookLM (Notebooks, Fontes, Notas, Studio, Artefatos, Compartilhamento e Exportações).
- **Pronto para Deploy**: Inclui `Dockerfile` e guias para hospedagem em VPS (Easypanel).

---

## 🚀 Instalação e Configuração

### 1. Instalar o Nó de Comunidade

Siga o [guia de instalação de nós de comunidade do n8n](https://docs.n8n.io/integrations/community-nodes/installation/).
Na sua instância do n8n:

1. Vá em **Settings > Community Nodes**.
2. Clique em **Install a community node**.
3. Digite `n8n-nodes-notebooklm`.

### 2. Rodar o Servidor MCP

O nó requer um servidor NotebookLM MCP rodando em modo HTTP.

```bash
notebooklm-mcp --transport http --port 8000
```

_Nota: Certifique-se de ter autenticado via `nlm login` primeiro._

---

## 🔒 Credenciais e Segurança

Este nó usa o tipo de credencial **NotebookLM MCP API** para segurança.

1. **Server URL**: A URL completa para o seu servidor MCP (ex: `https://mcp.seu-dominio.com/mcp`).
2. **API Key**: A chave secreta configurada no seu servidor através da variável de ambiente `NOTEBOOKLM_API_KEY`.

---

## ✨ Funcionalidades

- **Notebooks**: Criar, Listar, Renomear, Deletar, Descrever e Pesquisa Profunda (Deep Research).
- **Fontes**: Adicionar (URL, Texto, Drive, Arquivo Local), Listar, Deletar e Sincronizar.
- **Notas**: CRUD Completo (Criar, Ler, Atualizar, Deletar) para notas dentro dos notebooks.
- **Chat/Consulta**: Faça perguntas aos seus notebooks com citações geradas por IA.
- **Studio**: Criar Visões Gerais em Áudio (Podcasts), roteiros de YouTube, FAQs e muito mais.
- **Artefatos**: Listar e Baixar arquivos gerados (Áudio, PDF, etc.).
- **Compartilhamento**: Gerenciar status de compartilhamento, convidar colaboradores e definir acesso público.
- **Exportações**: Exportar conteúdo do notebook para Google Docs ou Google Sheets.

---

## 🚢 Implantação em VPS (Easypanel + Integração GitHub)

Esta é a maneira recomendada de hospedar seu próprio servidor NotebookLM MCP privado:

1. **Conectar GitHub**: No Easypanel, vá em **Settings** e garanta que seu **GitHub Token** está configurado.
2. **Criar App**: Escolha **App** -> **Github**.
3. **Detalhes do App**:
   - **Repository**: `guilhermeverdoodt/n8n-nodes-notebooklm-mcp`
   - **Branch**: `main`
   - **Build Path**: `/`
4. **Configuração de Build**:
   - **Build Method**: `Dockerfile`
   - **Docker Context**: `./`
   - **Dockerfile Path**: `Dockerfile`
5. **Variáveis de Ambiente**:
   - `NOTEBOOKLM_COOKIES`: Copie do seu arquivo `cookies.json` local.
   - `NOTEBOOKLM_API_KEY`: Defina uma chave secreta forte para autenticação.
6. **Rede (Networking)**:
   - **Port**: `8000`
   - **Domain**: Defina seu subdomínio (ex: `mcp.seu-dominio.com`).
   - (Opcional) Ative o middleware **Basic Auth** para segurança extra.

---

## 🛠️ Desenvolvimento Local e Publicação

### Teste Local

```bash
npm install
npm run build
npm link
# No diretório do n8n:
npm link n8n-nodes-notebooklm
```

### Publicando no npm

1. `npm login`
2. `npm publish --access public`

---

## 🤖 Guia de Automação com IA

Este nó foi otimizado para Agentes de IA e automação. Use o **Smart List Flattening** para conectar seu agente ao conhecimento do NotebookLM de forma eficaz:

### Seleção Dinâmica de Conhecimento

Em vez de fixar IDs (hardcoding), você pode encontrar notebooks pelo nome:

1. **Listar Notebooks**: Use a operação `Notebook: List`.
2. **Filtrar**: Adicione um nó de **Filter** nativo do n8n para comparar o `title` (ex: _title é igual a "Meu Conhecimento"_).
3. **Conectar Agente**: No próximo nó (ex: `Notebook: Query`), defina o **Notebook ID** como uma expressão: `{{ $json.id }}`.

Isso permite que seu agente sempre aponte para o conhecimento correto, mesmo que você renomeie ou recrie os notebooks.

---

## Licença

[MIT](LICENSE)
