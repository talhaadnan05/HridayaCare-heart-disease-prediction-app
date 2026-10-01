function getPercent(value) {
  const probability = Number(value);
  return Number.isFinite(probability) ? Math.max(0, Math.min(100, Math.round(probability <= 1 ? probability * 100 : probability))) : 0;
}

export default function PredictionResult({ result, values, loading, error }) {
  if (!result) return <aside className="result-column">
    <section className="result-card result-empty">
      <div className="result-card-top"><span className="card-kicker">Prediction result</span><span className="result-symbol">♡</span></div>
      <div className="empty-gauge"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.1Z"/></svg></span></div>
      <h2>{loading ? "Analyzing profile" : "Your result will appear here"}</h2>
      <p>{loading ? "The model is processing the submitted measurements." : "Complete the patient profile and calculate a risk estimate to see the analysis."}</p>
      <div className="result-placeholder-row"><i /> Model estimate <span>{loading ? "In progress" : "Awaiting input"}</span></div>
    </section>
    {error && <div className="error-banner" role="alert"><span>!</span><div><strong>Prediction unavailable</strong><p>{error}</p></div></div>}
    <div className="disclaimer-card"><span className="shield-icon">✓</span><p>Educational estimate only. This tool is not validated for clinical decision-making.</p></div>
  </aside>;

  const percent = getPercent(result.probability);
  const level = String(result.risk_level || "unknown").toLowerCase();
  const knownLevel = ["low", "moderate", "high"].includes(level) ? level : "moderate";
  return <aside className="result-column" aria-live="polite">
    <section className={`result-card result-${knownLevel}`}>
      <div className="result-card-top"><span className="card-kicker">Prediction result</span><span className="result-symbol">♡</span></div>
      <div className="result-main">
        <div><span className="risk-label">{level} risk estimate</span><h2>{percent}<small>%</small></h2><p>Model-estimated probability</p></div>
        <div className="risk-gauge" style={{ "--progress": `${percent}%` }} role="img" aria-label={`Model probability ${percent} percent`}><div><strong>{percent}%</strong><span>probability</span></div></div>
      </div>
      <div className={`risk-pill ${knownLevel}`}>{knownLevel} risk</div>
      <p className="result-explanation">{knownLevel === "high" ? "The model estimates a higher likelihood of the dataset outcome. Consider discussing health concerns with a qualified professional." : knownLevel === "moderate" ? "The model estimates an intermediate likelihood of the dataset outcome. A healthcare professional can help interpret individual measurements." : "The model estimates a lower likelihood of the dataset outcome. This result does not rule out health conditions."}</p>
      {values && <div className="submitted-metrics"><div><span>Blood pressure</span><strong>{values.trestbps}<small> mmHg</small></strong></div><div><span>Cholesterol</span><strong>{values.chol}<small> mg/dL</small></strong></div><div><span>Max heart rate</span><strong>{values.thalach}<small> bpm</small></strong></div></div>}
      <p className="result-disclaimer">{result.disclaimer || "Educational estimate only. Not a medical diagnosis."}</p>
    </section>
    {error && <div className="error-banner" role="alert"><span>!</span><div><strong>Prediction unavailable</strong><p>{error}</p></div></div>}
  </aside>;
}
