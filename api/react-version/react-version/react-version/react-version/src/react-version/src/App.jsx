import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, HelpCircle, Droplets, Loader2 } from "lucide-react";

const EXAMPLES = [
  { lang: "Roman Urdu", text: "Fori khabar: kal raat sailab shehar mein dakhil ho jayega, sab log abhi ghar khali kar dein, warna phans jayenge." },
  { lang: "Urdu", text: "محکمہ موسمیات کے مطابق اگلے 48 گھنٹوں میں شہر کے نشیبی علاقوں میں بارش کی پیشگوئی ہے، رہائشیوں کو احتیاط کی ہدایت۔" },
  { lang: "Roman Urdu", text: "Breaking: hukumat ne floodzone mein sab bank accounts freeze kar diye hain, abhi apna paisa nikal lein warna chala jayega!!" },
];

const VERDICTS = {
  fake: { label: "Likely Fake", labelUr: "ممکنہ طور پر جھوٹی", icon: AlertTriangle, color: "#C1553B" },
  unverified: { label: "Unverified", labelUr: "غیر تصدیق شدہ", icon: HelpCircle, color: "#E8A33D" },
  real: { label: "Likely Real", labelUr: "ممکنہ طور پر درست", icon: ShieldCheck, color: "#3F8F82" },
};

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function analyze(text) {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (e) {
      setError("Couldn't analyze that post. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const verdict = result ? VERDICTS[result.verdict] || VERDICTS.unverified : null;
  const VerdictIcon = verdict?.icon;

  return (
    <div style={{ minHeight: "100vh", background: "#14202B", fontFamily: "'Inter', system-ui, sans-serif", color: "#EDE7DA" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Droplets size={20} color="#E8A33D" />
            <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B97A3" }}>
              Applied AI Project · Independent Study
            </span>
          </div>
          <h1 style={{ fontSize: 26, lineHeight: 1.3, margin: "0 0 4px", color: "#F4EFE6", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Urdu &amp; Roman Urdu Misinformation Detector
          </h1>
          <h2 style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: 26, lineHeight: 1.8, margin: "0 0 10px", direction: "rtl", color: "#C9BFA8", fontWeight: 500 }}>
            اردو غلط معلومات شناخت کار
          </h2>
          <p style={{ fontSize: 15, color: "#8B97A3", margin: 0, maxWidth: 520 }}>
            Paste an Urdu or Roman Urdu post — flood alert, health claim, political rumour — and get a screening
            verdict with reasoning. Built for posts that spread fast during Pakistan's monsoon season.
          </p>
        </div>

        <div style={{ background: "#1B2A38", borderRadius: 14, padding: 20, border: "1px solid #2A3B4A" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="یہاں پوسٹ پیسٹ کریں... یا Roman Urdu mein type karein"
            rows={4}
            dir="auto"
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "vertical", color: "#F4EFE6", fontSize: 16, lineHeight: 1.6, fontFamily: "inherit", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInput(ex.text)}
                  style={{ fontSize: 12, padding: "5px 10px", borderRadius: 20, border: "1px solid #3A4D5C", background: "transparent", color: "#8B97A3", cursor: "pointer" }}
                >
                  Try: {ex.lang} example
                </button>
              ))}
            </div>
            <button
              onClick={() => analyze(input)}
              disabled={loading || !input.trim()}
              style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: loading || !input.trim() ? "#3A4D5C" : "#E8A33D", color: "#14202B", fontWeight: 600, fontSize: 14, cursor: loading || !input.trim() ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              {loading && <Loader2 size={15} style={{ animation: "spin 0.9s linear infinite" }} />}
              {loading ? "Analyzing" : "Analyze post"}
            </button>
          </div>
        </div>

        {error && <p style={{ color: "#C1553B", fontSize: 14, marginTop: 16 }}>{error}</p>}

        {result && verdict && (
          <div style={{ marginTop: 28, background: "#1B2A38", borderRadius: 14, padding: 24, border: `1px solid ${verdict.color}55` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <VerdictIcon size={22} color={verdict.color} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: verdict.color }}>{verdict.label}</div>
                <div style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: 14, color: "#8B97A3", direction: "rtl" }}>
                  {verdict.labelUr}
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 13, color: "#8B97A3" }}>Confidence: {result.confidence}%</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#8B97A3", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Risk gauge
              </div>
              <div style={{ position: "relative", height: 14, background: "#0F1820", borderRadius: 7, overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: `${result.confidence}%`,
                    background: `linear-gradient(90deg, ${verdict.color}99, ${verdict.color})`, borderRadius: 7, transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>

            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#D9D2C4", margin: "0 0 16px" }}>{result.reasoning_en}</p>

            {result.flags && result.flags.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {result.flags.map((f, i) => (
                  <span key={i} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "#0F1820", color: "#8B97A3", border: "1px solid #2A3B4A" }}>
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #2A3B4A" }}>
          <p style={{ fontSize: 12.5, color: "#5F6E7A", lineHeight: 1.7 }}>
            <strong style={{ color: "#8B97A3" }}>Methodology note:</strong> This tool compares an AI-based classifier
            (used here) against a simpler keyword-matching baseline as part of an independent project screening
            Urdu / Roman Urdu misinformation during flood season. Sample verdicts should be verified against
            official sources (NDMA, PDMA, PMD) before acting on them — this is a screening aid, not a fact-checker.
          </p>
          <p style={{ fontSize: 12.5, color: "#5F6E7A", marginTop: 18, letterSpacing: "0.04em" }}>
            Made by <span style={{ color: "#8B97A3", fontWeight: 600 }}>Anas Anwar</span>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        textarea::placeholder { color: #5F6E7A; }
      `}</style>
    </div>
  );
}
