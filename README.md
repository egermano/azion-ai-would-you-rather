# Azion AI Would You Rather

A monorepo for the Azion AI "Would You Rather" application, managed with pnpm workspaces.

## Structure

```
├── apps/
│   ├── web/                 # Main React application
│   └── serverless/          # Azion Edge Function for AI API
├── packages/
│   └── ui/                  # Shared UI components
├── pnpm-workspace.yaml      # Workspace configuration
└── package.json             # Root package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Development

```bash
# Start the web application
pnpm dev

# Run linting across all packages
pnpm lint

# Run type checking across all packages
pnpm typecheck

# Build the web application
pnpm build
```

### Working with Workspaces

```bash
# Install a dependency to a specific workspace
pnpm --filter @azion-ai-would-you-rather/web add <package>

# Run a command in a specific workspace
pnpm --filter @azion-ai-would-you-rather/web <command>

# Run a command in all workspaces
pnpm --recursive <command>
```

## Packages

- **@azion-ai-would-you-rather/web**: Main React application with Vite, TypeScript, and Tailwind CSS
- **@azion-ai-would-you-rather/ui**: Shared UI components library
- **apps/serverless**: Azion Edge Function for generating "Would you rather" dilemmas using AI

## Serverless Function

The serverless function is deployed on Azion Edge Computing and provides an API endpoint for generating AI-powered "Would you rather" dilemmas.

**Live URL**: https://mupojq1z1uu.map.azionedge.net/

### Features
- Generates dilemmas in Portuguese (PT-BR)
- Random theme selection from Azion-related topics
- Uses Azion AI with Qwen model
- Returns structured JSON responses
- Web app integration with real-time API consumption
- Local storage of answers and questions
- Dynamic question loading
- Theme and difficulty display
