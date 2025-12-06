# DevTools AI 🛠️✨

**DevTools AI** is a professional-grade developer utility suite powered by **Google Gemini 2.5 & 3.0 Pro models**. It combines advanced AI generation tools with essential offline utilities in a unified, beautiful glassmorphic interface.

Built with **React 19**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Features

The application features over **45+ tools** organized into intelligent categories:

### 🧠 AI Powered
*   **Prompt Alchemy**: Transform basic ideas into engineering-grade Midjourney/LLM prompts.
*   **Project Scaffolder**: Generate full-scale shell scripts to bootstrap projects.
*   **Smart Diff Analyst**: AI-powered semantic analysis of code/text differences.
*   **Smart SVG Studio**: Generate production-ready SVG vectors from text descriptions.
*   **cURL to Code**: Convert cURL commands to Python, Node, Go, Rust, etc.
*   **AI Regex Wizard**: Generate, debug, and explain complex regular expressions.
*   **Smart SQL Studio**: Optimize, format, and explain SQL queries.
*   **NLP to SQL**: Convert natural language questions into valid SQL.
*   **Data Visualizer**: Turn raw data/text into interactive charts (Bar, Line, Pie, Area).
*   **Python Vis Gen**: Generate Matplotlib/Seaborn Python code from descriptions.
*   **Smart Diagram**: Generate Mermaid.js flowcharts and diagrams.
*   **Smart Cron**: Convert natural language to Cron expressions.
*   **Polyglot Converter**: Port code between 12+ programming languages.
*   **Git Commit Genius**: Generate conventional commit messages from diffs.
*   **Smart README**: Generate professional project documentation.
*   **Smart Summarizer**: Condense long articles or documents.
*   **Sentiment Analyzer**: Detect emotional tone and score text.
*   **Emoji Translator**: Convert plain text into expressive emoji sentences.
*   **Quick Math**: Solve complex math and word problems with step-by-step AI reasoning.

### 🎨 Creative & Lifestyle
*   **Color Studio**: Generate cohesive color palettes from abstract descriptions (e.g., "Cyberpunk Tokyo").
*   **Magic Editor**: Polish text with adjustable tones (Professional, Friendly, Concise).
*   **CSS Animator**: Generate complex CSS keyframe animations from text.

### ⚒️ Text Forge (Effects)
*   **Text Forge**: Advanced text mutator (Leet, Glitch/Zalgo, Mirror, Vaporwave, Redacted, etc.).

### 🔧 Generators
*   **WiFi QR Builder**: Create secure, scannable WiFi configuration QR codes.
*   **UUID Generator**: Bulk generate v4 UUIDs.
*   **Mock Data Chef**: Generate realistic, complex JSON datasets for testing.
*   **Meta Tag Wizard**: Generate SEO-optimized HTML meta tags.
*   **Password Analyzer**: Client-side password strength estimation.

### 📜 Formatters
*   **JSON Formatter**: Validate, format (pretty-print), and minify JSON.
*   **Diff-o-matic**: Visual side-by-side text comparison tool.
*   **Crypto Hasher**: Compute SHA-1, SHA-256, SHA-512, and HMAC hashes.

### 🔄 Converters
*   **Base64 Converter**: UTF-8 safe text/base64 conversion.
*   **Markdown Preview**: Live Markdown to HTML renderer.
*   **Color Converter**: Bi-directional HEX ↔ RGB ↔ HSL.
*   **CSV ↔ JSON**: Two-way data format transformer.
*   **JWT Decoder**: Inspect JWT headers and payloads without verification.
*   **Number Base**: Convert between Binary, Octal, Decimal, and Hexadecimal.
*   **Timestamp**: Epoch to Human Date converter.
*   **URL Encoder**: URL safety encoder/decoder.
*   **String Case**: Switch between camel, snake, kebab, and pascal case.
*   **Binary Text**: Text to binary stream converter.
*   **PX to REM**: CSS unit calculator based on root font size.
*   **Unit Converter**: Length, Weight, and Temperature conversions.
*   **Morse Code**: Bidirectional text-to-morse translator.
*   **List Transformer**: Convert lists to CSV, Arrays, or custom formats.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript 5.x
*   **Styling**: Tailwind CSS (Custom animations, Glassmorphism)
*   **AI Integration**: `@google/genai` SDK (Gemini 2.5 Flash & 3.0 Pro)
*   **Visualization**: Recharts
*   **Icons**: Lucide React + Emojis

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/devtools-ai.git
    cd devtools-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *Get your key from [Google AI Studio](https://aistudio.google.com/)*.

4.  **Run Development Server**
    ```bash
    npm start
    ```

## 🚢 Deployment

Detailed deployment instructions for Vercel can be found in [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md).

## 📄 License

MIT License. Open source and free to use.