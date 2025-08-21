# Server Directory Structure

```
packages/server/
├── .dependency-cruiser.cjs
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .vscode/
├── dependency-graph.svg
├── node_modules/
├── package.json
├── package-lock.json
├── renovate.json
├── src/
│   └── modules/
│       ├── architecture/
│       ├── auth/
│       ├── server/
│       ├── statement/
│       └── transactions-sync/
└── test/
```

## Main Directories Description

- `src/` : Contains the application source code
  - `modules/` : Organized by features
    - `architecture/` : Architectural components
    - `auth/` : Authentication management
    - `server/` : Server configuration and setup
    - `statement/` : Statement management
    - `transactions-sync/` : Transaction synchronization

- `test/` : Contains the application tests

## Configuration Files

- `.env` : Environment variables (not versioned)
- `.env.example` : Example environment variables
- `.eslintrc.json` : ESLint configuration
- `.dependency-cruiser.cjs` : Dependency analysis configuration
- `renovate.json` : Renovate configuration for automatic dependency updates 