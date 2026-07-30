Urdu & Roman Urdu Misinformation Detector — React Version
This is a React + Vite implementation of the same tool that lives in the repo root (index.html, vanilla JS). Same design, same prompt logic, same serverless API — just built with React components instead.
It calls its own /api/analyze serverless function (included in this folder), which keeps your Anthropic API key safely on the server. It never calls the Anthropic API directly from the browser.
Deploying this version live (separate from the main site)
Push this whole repo to GitHub (this react-version folder included)
Go to vercel.com → Add New → Project
Import the same repository again as a second Vercel project
In the project settings, set Root Directory to react-version
Add the environment variable: Name: ANTHROPIC_API_KEY, Value: your key from console.anthropic.com
Deploy — Vercel will run npm install and npm run build automatically and give you a second live URL, e.g. urdu-detector-react.vercel.app
Running it locally
cd react-version
npm install
npm run dev
Note: the /api/analyze endpoint only works when deployed on Vercel (or run via vercel dev), since it's a serverless function — running npm run dev alone will show the UI but analysis requests will fail locally unless you also run vercel dev.
Why two versions?
Having both a vanilla JS implementation and a React implementation of the same tool, live and deployed, is a small but genuine demonstration of being comfortable in both approaches — useful to show in a portfolio or CV alongside the project writeup.
