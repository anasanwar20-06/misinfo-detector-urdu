# Urdu & Roman Urdu Misinformation Detector — Deployment Guide

This gives your project a real, standalone public URL (e.g. `urdu-detector.vercel.app`)
that anyone can open without needing Claude.ai.

## What's in this folder
- `index.html` — the full frontend (no build step needed)
- `api/analyze.js` — a serverless function that calls the Anthropic API safely
- `vercel.json` — deployment config

## Step 1 — Get an Anthropic API key
1. Go to https://console.anthropic.com
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy it somewhere safe (you'll paste it into Vercel, never into your code)
5. Note: this requires adding billing details / credits — usage for a small student
   project like this (a few hundred requests) costs only a few dollars.

## Step 2 — Push this folder to GitHub
1. Create a free GitHub account if you don't have one: https://github.com
2. Create a new repository, e.g. `urdu-misinformation-detector`
3. Upload this folder's contents to it (GitHub's "upload files" button works fine,
   no need for git command line knowledge)

## Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up using your GitHub account (free)
2. Click **Add New → Project**
3. Select your `urdu-misinformation-detector` repository
4. Before clicking Deploy, go to **Environment Variables** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (paste the key from Step 1)
5. Click **Deploy**
6. After ~30 seconds you'll get a live URL like `https://urdu-misinformation-detector.vercel.app`

## Step 4 — Test it
Open the URL, paste a sample post, click **Analyze post**. If you get an error,
double check the environment variable name matches exactly: `ANTHROPIC_API_KEY`.

## Step 5 (optional) — Custom domain
In Vercel project settings → **Domains**, you can attach a custom domain if you buy one
later (e.g. `anasanwar.dev`). Not required — the free `.vercel.app` URL is enough for
a university project or CV link.

## Sharing it
Once deployed, send the Vercel URL to anyone — it works on phone or desktop, no login
required for the person trying it.
