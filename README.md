# QA Automation Academy

A comprehensive learning hub for QA Automation engineers, featuring tutorials on Java, Selenium, Playwright, UFT, and TypeScript.

## Project Structure
This is a static website built with:
- **HTML5**: Semantic structure.
- **Tailwind CSS**: Utility-first styling (via CDN).
- **Vanilla JavaScript**: Client-side logic for theme toggling, search, and dynamic components.

## How to Run Locally

Because this project uses absolute paths (e.g., `/assets/css/style.css`), you cannot simply double-click the `.html` files. You must run a local development server.

### Option 1: Using Node.js (Recommended)
If you have Node.js installed:

1. Open a terminal in this directory.
2. Run the following command:
   ```bash
   npx serve .
   ```
3. Open the URL shown (usually `http://localhost:3000`).

### Option 2: Using Python
If you have Python installed:

1. Open a terminal in this directory.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## Features
- **Dark/Light Mode**: Persisted user preference.
- **Client-Side Search**: Instant search using a generated JSON index.
- **Mobile Responsive**: Fully adaptive layout.
- **Syntax Highlighting**: Beautiful code blocks with copy functionality.
