# Vite React Shadcn TypeScript

This is a [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Shadcn/ui](https://ui.shadcn.com/) project.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root of this package with the following content:
```env
# Clerk Configuration
# Replace with your actual Clerk publishable key from the Clerk dashboard
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key-here

# Other environment variables
VITE_API_URL=http://localhost:3000
```

**Important**: You need to get a Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com/). Without this key, the application will throw an error.

### 3. Start the development server
```bash
npm run dev
```

## Troubleshooting

### Clerk Error: "Cannot read properties of null (reading 'useEffect')"
This error occurs when:
1. The `VITE_CLERK_PUBLISHABLE_KEY` environment variable is missing
2. There are React version conflicts

**Solution**: 
1. Create the `.env.local` file with your Clerk publishable key
2. Make sure you're using compatible React versions (React 19.x is recommended)


```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS