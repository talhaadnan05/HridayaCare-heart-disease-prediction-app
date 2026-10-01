import RiskCard from "../components/RiskCard";

function probabilityLabel(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `${Math.round(number <= 1 ? number * 100 : number)}%` : "—";
}

export default function Home({ onStart, latest }) {
  return <section className="dashboard-page">
    <div className="page-heading dashboard-heading">
      <div><p className="eyebrow">Cardiovascular health insights</p><h1>Heart Disease<br /><span>Prediction Dashboard</span></h1><p className="lead">AI-assisted analysis of cardiovascular health indicators.</p></div>
      <div className="heading-chip"><span className="pulse-dot" /> Secure analysis <span className="chip-divider" /> Educational tool</div>
    </div>

    <div className="dashboard-grid">
      <section className="overview-card model-card">
        <div className="card-topline"><span className="card-kicker">Prediction model</span><span className="mini-icon blue-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.2-6 4.1 12 2.2-6H21"/></svg></span></div>
        <div className="status-row"><span className="status-dot" /><h2>Ready</h2></div>
        <p>Machine learning classification model</p>
        <div className="model-footer"><span>8 clinical indicators</span><span className="footer-arrow">↗</span></div>
      </section>

      <section className="overview-card analysis-card">
        <div className="card-topline"><span className="card-kicker">Patient analysis</span><span className="mini-icon soft-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg></span></div>
        <h2>Start with a patient profile</h2>
        <p>Enter clinical measurements to generate a model-based estimate.</p>
        <button className="primary-button compact-button" onClick={onStart}>New prediction <span aria-hidden="true">↗</span></button>
      </section>

      <section className="overview-card latest-card">
        <div className="card-topline"><span className="card-kicker">Latest prediction</span><span className="mini-icon soft-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.1Z"/></svg></span></div>
        {latest ? <><div className="latest-result"><div><h2>{probabilityLabel(latest.probability)}</h2><p>Model probability</p></div><RiskCard level={String(latest.risk_level || "unknown").toLowerCase()} text="estimated risk" /></div><p className="latest-note">Most recent completed analysis</p></> : <div className="latest-empty"><span className="empty-line" /><strong>No predictions yet</strong><p>Your latest model result will appear here.</p></div>}
      </section>

      <section className="overview-card signal-card">
        <div className="signal-copy"><span className="card-kicker">Clinical inputs</span><h2>Eight indicators.<br />One clear overview.</h2><p>Review the measurements used in each model estimate.</p><button className="text-link" onClick={onStart}>Explore prediction form <span aria-hidden="true">→</span></button></div>
        <div className="ecg-art" aria-hidden="true"><div className="ecg-orbit orbit-one" /><div className="ecg-orbit orbit-two" /><svg viewBox="0 0 240 120"><path d="M8 66h48l17-30 24 63 24-76 22 45h88" /></svg><span className="ecg-center"><svg viewBox="0 0 24 24"><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.1Z"/></svg></span></div>
      </section>
    </div>
    <div className="dashboard-notice"><span className="notice-check">i</span><p><strong>For education and demonstration.</strong> Predictions are estimates based on the model and should not be interpreted as a medical diagnosis.</p><button onClick={onStart}>Run an analysis <span aria-hidden="true">↗</span></button></div>
  </section>;
}
