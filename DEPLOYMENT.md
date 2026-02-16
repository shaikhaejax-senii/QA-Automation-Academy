# Deployment Guide

Follow these steps to deploy your **QA Automation Academy** website to the public using GitHub and Vercel.

## Prism 1: Get Code on GitHub

1.  **Initialize Git** (if you haven't already):
    Open your terminal in the project folder and run:
    ```bash
    git init
    ```

2.  **Create a .gitignore file**:
    Ensure you have a `.gitignore` file to prevent uploading unnecessary files. It should contain:
    ```text
    node_modules
    .DS_Store
    ```

3.  **Commit your code**:
    ```bash
    git add .
    git commit -m "Initial commit of QA Automation Academy"
    ```

4.  **Create a Repository on GitHub**:
    - Go to [GitHub.com](https://github.com) and log in.
    - Click the **+** icon in the top right -> **New repository**.
    - Name it `qa-automation-academy`.
    - Click **Create repository**.

5.  **Push your code**:
    Copy the commands under "…or push an existing repository from the command line" and run them in your terminal. They will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/qa-automation-academy.git
    git branch -M main
    git push -u origin main
    ```

## Part 2: Deploy on Vercel

1.  **Log in to Vercel**:
    - Go to [Vercel.com](https://vercel.com) and sign up/log in (continue with GitHub is recommended).

2.  **Import Project**:
    - On your Vercel dashboard, click **Add New...** -> **Project**.
    - Connect your GitHub account if prompted.
    - Find `qa-automation-academy` in the list and click **Import**.

3.  **Configure Project**:
    - **Framework Preset**: Select **Other**.
    - **Root Directory**: Leave as `./`.
    - **Build Command**: Leave empty (this is a static site).
    - **Output Directory**: Leave empty.
    - **Install Command**: Leave empty.

4.  **Deploy**:
    - Click **Deploy**.
    - Wait a few seconds (~20s). Vercel will build and assign a URL (e.g., `qa-automation-academy.vercel.app`).

## Updates
Whenever you want to update the site:
1.  Make changes locally.
2.  Commit and push:
    ```bash
    git add .
    git commit -m "Update content"
    git push
    ```
3.  Vercel will detect the push and automatically re-deploy your site!
