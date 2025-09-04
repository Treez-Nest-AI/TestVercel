# Project info

This project is a Vite + React + TypeScript app using shadcn-ui and Tailwind CSS.

## How can I edit this code?

Use your preferred IDE locally or any Git-based workflow.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

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

You can also edit files directly in GitHub or use Codespaces if you prefer a cloud IDE.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy to any static hosting provider (e.g., Netlify, Vercel, Cloudflare Pages, GitHub Pages). Build with `npm run build` and serve the `dist/` folder.

## Google Sign-In configuration

This app uses `@react-oauth/google`. The client ID is read from `VITE_GOOGLE_CLIENT_ID` at build time. Configure both your environment and the Google Cloud Console:

1) Create a `.env` file for local development and set:

```
VITE_GOOGLE_CLIENT_ID=<your-oauth-client-id>
```

2) In production, set the environment variable in your hosting platform so builds have the correct value.

3) In Google Cloud Console > Credentials > OAuth 2.0 Client IDs, add these Authorized JavaScript origins (adjust for your domains):

- `https://www.teadifyz.ai`
- `https://teadifyz.ai` (if using apex domain)
- `http://localhost:5173` (or your dev port)

No redirect URIs are needed for `@react-oauth/google` implicit flow, but if you use redirect mode, also add the exact redirect URL your app uses.

If you see `Error 400: origin_mismatch`, it means the current page origin is not in the list above for the OAuth client used by the deployed build. Ensure the production build was created with the production client ID and that the exact origins are configured in Google.