"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const APP_NAME = "Space Law Compliance Checker";
const TAGLINE = "Outer Space Treaty, ITU regulations & national space law analysis";
const ACCENT = "hsl(330, 70%, 55%)";
const ACCENT_MID = "hsl(330, 60%, 45%)";

export default function SpaceLawPage() {
  const [activityType, setActivityType] = useState("");
  const [nation, setNation] = useState("");
  const [details, setDetails] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!activityType) { setOutput("Please describe the space activity."); return; }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert space law scholar and international space policy analyst. Analyze the following proposed or actual space activity against applicable international and national space law frameworks.

**Activity Information:**
- Activity Type: ${activityType} (e.g., asteroid mining, anti-satellite test, satellite constellation launch, lunar mining, nuclear power source deployment, space tourism, weapons test, satellite inspection mission)
- Operating Nation(s): ${nation || "Not specified"}
- Activity Details: ${details || "Not specified"}

Please provide:

## ⚖️ Applicable Legal Frameworks
Identify all relevant international and national legal instruments:
- Outer Space Treaty (1967) — key articles applicable
- Astronaut Agreement (1968)
- Space Liability Convention (1972)
- Registration Convention (1976)
- Moon Agreement (1984) — status and applicability
- ITU Radio Regulations (satellite spectrum)
- European Space Agency framework (if EU)
- US law (CLEAREDGE Act, Commercial Space Launch Competitiveness Act, ITAR)
- Other national laws (China's Space Law, Russia's Federal Space Program, etc.)

## 🔍 Compliance Analysis
For each applicable framework, assess:
- Compliance status (Compliant / Non-Compliant / Ambiguous / Not a Party)
- Specific obligations triggered by this activity
- Specific provisions potentially violated
- Interpretation nuances and treaty ambiguity

## 🚨 Flagged Issues & Risks
Identify the most significant compliance concerns:
- Liability issues (who is liable for damage)
- Harmful contamination concerns (Outer Space Treaty Article IX)
- Weapons prohibition (Outer Space Treaty Article IV)
- Resource extraction rights (Moon Agreement vs. US/China approach)
- Environmental obligations
- Due regard principle

## 📋 Recommendations
Provide practical recommendations for achieving compliance:
- Necessary regulatory approvals
- Disclosures required
- Consultation obligations
- Insurance/liability requirements
- Model practices for responsible space actors

## 🌍 International Context
Briefly discuss how this activity relates to current international space governance debates and trends.

## 📝 Plain-Language Summary`,
        }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No response received.");
    } catch { setOutput("Error generating compliance analysis. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #111 0%, #0a0a0a 50%, #111 100%)", color: "#e5e7eb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${ACCENT}33`, padding: "1.5rem 2rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
            <span style={{ color: ACCENT, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI x Astronomy</span>
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.5rem", color: "#f9fafb", letterSpacing: "-0.02em" }}>{APP_NAME}</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.25rem" }}>{TAGLINE}</p>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT}, ${ACCENT_MID})`, marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f3f4f6", marginBottom: "1.25rem" }}>Activity Details</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Activity Type *</label>
                  <input type="text" value={activityType} onChange={(e) => setActivityType(e.target.value)} placeholder="e.g., Asteroid mining, ASAT test, satellite deployment, lunar base" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Operating Nation(s)</label>
                  <input type="text" value={nation} onChange={(e) => setNation(e.target.value)} placeholder="e.g., United States, China, Luxembourg, UAE" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Activity Details (optional)</label>
                  <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Provide specifics: location, scale, timeline, technology used, target orbit/body, etc." style={{ ...inputStyle, height: "120px", resize: "vertical" }} />
                </div>
                <button onClick={handleGenerate} disabled={loading} style={{ ...buttonStyle, background: loading ? "rgba(200,60,80,0.3)" : ACCENT, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 20px ${ACCENT}55` }}>
                  {loading ? "Analyzing..." : "Check Compliance"}
                </button>
              </div>
            </div>
            <div style={{ marginTop: "1rem", background: "rgba(200,60,80,0.05)", border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", lineHeight: 1.6 }}>
                <span style={{ color: ACCENT, fontWeight: 600 }}>Key Treaty:</span> The Outer Space Treaty (1967) prohibits weapons of mass destruction in space (Article IV), makes states liable for damage caused by their space objects (Article VI), and requires harmful contamination prevention (Article IX).
              </p>
            </div>
          </div>
          <div>
            {output ? (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem", minHeight: 400 }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#d1d5db", marginBottom: "1.25rem" }}>Compliance Analysis</h2>
                <div style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.75, overflowY: "auto", maxHeight: "calc(100vh - 380px)" }}>
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.75rem", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${ACCENT}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>⚖️</div>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", textAlign: "center" }}>Describe a space activity<br /><strong style={{ color: "#9ca3af" }}>for compliance analysis</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer style={{ borderTop: `1px solid ${ACCENT}22`, padding: "1.25rem 2rem", textAlign: "center", color: "#4b5563", fontSize: "0.75rem", marginTop: "2rem" }}>AI x Astronomy · Cycle 67 · Powered by DeepSeek · For educational and research purposes</footer>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af", marginBottom: "0.35rem", letterSpacing: "0.04em", textTransform: "uppercase" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f3f4f6", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" };
const buttonStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "none", color: "#fff", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.2s", marginTop: "0.5rem" };
