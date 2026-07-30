# Urdu & Roman Urdu Misinformation Detector

An AI-based screening tool that analyzes Urdu and Roman Urdu social media posts (flood alerts, health claims, political rumours) and returns a verdict — fake, unverified, or real — with reasoning and risk flags.

**Live demo:** Not yet deployed — see "Running it yourself" below to run locally or deploy your own instance.


## Why this project

Urdu-language NLP is significantly underexplored compared to English, despite being spoken by over 230 million people. Pakistan also faces a recurring, high-stakes misinformation problem during monsoon/flood season, when false flood alerts and fake advisories spread rapidly on social media and can cause real harm. This project sits at the intersection of both gaps: applying modern LLM-based classification to a low-resource language, in a locally relevant context.

This is an independent project ( ), built to explore practical applied NLP beyond coursework.

## How it works

- The user pastes a post in Urdu or Roman Urdu into the web interface.
- A Vercel serverless function sends the text to Claude (Anthropic API) with a structured prompt that asks it to evaluate: urgency/alarmist language, unverifiable claims, "share immediately" calls to action, lack of attribution to an official source, and stylistic patterns typical of genuine advisories (e.g. NDMA/PMD alerts tend to be calm and specific).
- The model returns a structured verdict (fake / unverified / real), a confidence score, a short reasoning explanation, and specific red-flag tags.
- The result is displayed with a risk gauge and flags in a bilingual (English/Urdu) interface.

## Tech stack

- **Frontend:** Vanilla HTML/CSS/JS, no build step — bilingual UI with RTL Urdu text support (Noto Nastaliq Urdu font)
- **Backend:** Vercel serverless function (Node.js)
- **AI:** Anthropic Claude API for classification and reasoning
- **Deployment:** Vercel

## Two implementations, both deployable

This repo contains two working versions of the same tool:

- **Root folder** — vanilla HTML/CSS/JS, no build step
- **`react-version/`** — React + Vite implementation, same design and logic

Both call the same kind of serverless `/api/analyze` function and can be deployed
live independently on Vercel. See `react-version/README.md` for how to deploy the
React version as a second live URL.

## Project structure

```
urdu-detector/
├── index.html              # Vanilla JS frontend (deployable)
├── api/
│   └── analyze.js          # Serverless function — calls Claude API, keeps key server-side
├── vercel.json
├── react-version/
│   ├── src/
│   │   ├── App.jsx         # React implementation of the same tool
│   │   └── main.jsx
│   ├── api/
│   │   └── analyze.js      # Same serverless function, for standalone deployment
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── README.md            # How to deploy this version
└── DEPLOY_GUIDE.md          # Step-by-step deploy instructions (vanilla version)
```

## Running it yourself

1. Clone this repo
2. Deploy to [Vercel](https://vercel.com) (connect your GitHub account, import this repo)
3. In Vercel project settings → Environment Variables, add `ANTHROPIC_API_KEY` with your key from [console.anthropic.com](https://console.anthropic.com)
4. Deploy — you'll get a live URL in under a minute

See `DEPLOY_GUIDE.md` for detailed step-by-step deployment instructions.

## Limitations & disclaimer

This is a screening aid, not a fact-checker. It is designed as a portfolio/research project to demonstrate applied NLP on a low-resource language, not a production moderation tool. Verdicts should always be verified against official sources (NDMA, PDMA, PMD) before acting on them.

## Author

**Anas Anwar** — BS Computer Science student, Government College University Faisalabad
Focused on AI/ML, NLP, and data science, with an interest in graduate research abroad.
