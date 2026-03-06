FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy project files
COPY . .

# Install the package
RUN pip install . --break-system-packages

# Create profile directory
RUN mkdir -p /root/.notebooklm-mcp-cli/profiles/default

# Expose the port
EXPOSE 8000

# Run the server in HTTP mode
# NOTE: NOTEBOOKLM_COOKIES env var must be provided for authentication
CMD ["notebooklm-mcp", "--transport", "http", "--host", "0.0.0.0", "--port", "8000"]
