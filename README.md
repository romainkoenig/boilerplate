# Rules

Boilerplate Clerk React & Fastify

Create `.env.local` file in `client-react/` with `VITE_CLERK_PUBLISHABLE_KEY`

Create `.env` file in `server/` with `CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` (And optional: `PRINT_CONFIG=true`)

```bash
nvm use
npm i
cd packages/server && npm i && npm run dev
cd packages/client-react && npm i && npm run dev
```


