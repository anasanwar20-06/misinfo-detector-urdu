// Vercel serverless function — keeps your API key on the server, never in the browser.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { text } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Missing 'text' in request body" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // set this in Vercel project settings
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are a misinformation-screening assistant for Urdu and Roman Urdu social media posts in a Pakistani context (floods, health, politics, public alerts). Analyze the post below and respond ONLY with JSON, no preamble, no markdown fences, in this exact shape:
{"verdict":"fake"|"unverified"|"real","confidence":0-100,"reasoning_en":"1-2 sentence explanation in English","flags":["short flag 1","short flag 2"]}

Consider: urgency/alarmist language, unverifiable claims, calls to "share immediately", lack of attribution to an official source, and known real patterns (e.g. genuine NDMA/PMD-style advisories tend to be calm and specific).

Post:
"""${text}"""`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "API error" });
    }

    const textBlock = data.content.find((b) => b.type === "text")?.text || "";
    const cleaned = textBlock.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Failed to analyze text" });
  }
}
