# Deploying DevTools AI to Vercel

This guide outlines the steps to deploy the DevTools AI application to Vercel, the recommended platform for React applications.

## Prerequisites

1.  A [Vercel Account](https://vercel.com/signup).
2.  A [Google AI Studio API Key](https://aistudio.google.com/).
3.  Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket).

---

## 🚀 Option 1: Quick Deploy (Dashboard)

1.  **Import Project**:
    *   Log in to your Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your Git repository containing the DevTools AI code.

2.  **Configure Project**:
    *   **Framework Preset**: Vercel usually detects "Create React App" or "Vite" automatically. If not, select the one matching your `package.json` scripts.
    *   **Root Directory**: `./` (default).

3.  **Environment Variables (Critical)**:
    *   Expand the **"Environment Variables"** section.
    *   Add the following variable:
        *   **Key**: `API_KEY`
        *   **Value**: `your_actual_google_gemini_api_key`
    *   *Note: Without this key, all AI features (Regex, SQL, Chat, etc.) will fail.*

4.  **Deploy**:
    *   Click **"Deploy"**. Vercel will build your application and assign a domain.

---

## 💻 Option 2: Vercel CLI

If you prefer the command line:

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run this command in your project root:
    ```bash
    vercel
    ```

4.  **Follow Prompts**:
    *   Set up and deploy? **Y**
    *   Which scope? **(Select your team/account)**
    *   Link to existing project? **N**
    *   Project name? **devtools-ai**
    *   Directory? **./**

5.  **Set API Key**:
    Go to the Vercel Dashboard -> Settings -> Environment Variables and add `API_KEY`.
    
    *Or use the CLI:*
    ```bash
    vercel env add API_KEY
    # Paste your key when prompted
    # Select 'Production', 'Preview', and 'Development'
    ```

6.  **Redeploy**:
    Changes to environment variables require a redeploy to take effect:
    ```bash
    vercel --prod
    ```

---

## ⚙️ Build Settings

If Vercel does not automatically detect your build settings, use the following configuration based on your bundler:

**For Create React App / Webpack:**
*   **Build Command**: `npm run build`
*   **Output Directory**: `build`
*   **Install Command**: `npm install`

**For Vite:**
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Install Command**: `npm install`

---

## 🔧 Troubleshooting

### AI Features Not Working?
*   Check the browser console (F12). If you see 401/403 errors from Google GenAI, your `API_KEY` is likely missing or invalid.
*   Ensure you added the `API_KEY` in Vercel **Settings > Environment Variables**.
*   **Did you redeploy?** After adding variables, you must redeploy for them to be embedded in the build.

### Build Fails?
*   Check the build logs in Vercel.
*   Ensure `typescript` and `@types/react` are listed in your `package.json` dependencies (not just devDependencies) if Vercel is building in production mode, or set `NPM_CONFIG_PRODUCTION=false` env var.
*   Ensure you aren't committing the `.env` file to Git (it should be in `.gitignore`).

### "Module not found"?
*   Ensure all new files (like `components/tools/NewTool.tsx`) are actually committed to your Git repository.