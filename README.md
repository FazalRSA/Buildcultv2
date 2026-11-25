# Build Cult - Web Application

This is the codebase for the Build Cult web application, built with React, Vite, Tailwind CSS, and Framer Motion.

## Getting Started

To run this project locally after exporting from Google AI Studio:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or port 3000 depending on Vite config).

3. **Build for production:**
   ```bash
   npm run build
   ```
   This command will compile the application and output static files into the `dist` directory.

## Making Changes

- **Pages and Routing:** The main routing logic is located in `src/App.tsx`. We use `react-router-dom` (BrowserRouter).
- **Components:** Reusable UI components are located in the `src/components/` directory.
- **Styling:** We use Tailwind CSS. You can add Tailwind classes directly to your JSX. Global styles and Tailwind imports are in `src/index.css`.
- **Content:** The portfolio projects and services text are managed in the `src/constants.ts` file. You can easily add or modify text content there without touching component logic.
- **Animations:** We heavily utilize `motion/react` (Framer Motion) for page transitions and micro-interactions.

## Deployment

### Vercel Integration

Vercel is great for single-page React applications built with Vite.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create an account or log in.
3. Click **Add New** > **Project**.
4. Import your newly created GitHub repository.
5. Vercel will automatically detect that you are using Vite and configure the build settings (`npm run build` and `dist` output directory).
6. Under **Environment Variables**, add any if needed. 
7. Click **Deploy**. Vercel will give you a live URL.

### Cloudflare Pages

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create application** > **Pages** > **Connect to Git**.
3. Connect your GitHub account and select your repository.
4. Set the **Framework preset** to `Vite` (or set the build command to `npm run build` and output directory to `dist`).
5. Click **Save and Deploy**. Cloudflare Pages will build and host your site directly from edge nodes globally.

> **Note on Router:** If you host on Vercel or Cloudflare Pages using `BrowserRouter`, ensure you configure rewrites to point all requests to `index.html` (e.g., using a `vercel.json` file for Vercel or a `_routes.json` for Cloudflare) to prevent 404 errors on deep links.
