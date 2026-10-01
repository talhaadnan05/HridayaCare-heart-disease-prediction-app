const features = [
  ["Age", "Patient age in years"], ["Sex", "Recorded sex category"],
  ["Chest pain type", "Reported chest discomfort category"], ["Blood pressure", "Resting systolic pressure"],
  ["Cholesterol", "Serum cholesterol reading"], ["Maximum heart rate", "Peak rate during exercise"],
  ["Exercise angina", "Chest pain with exertion"], ["ST depression", "Exercise-related ECG change"],
];

export default function FeatureInfo() {
  return <aside className="feature-info"><div className="feature-info-head"><span className="info-mark">i</span><div><h3>About these indicators</h3><p>The model uses eight measurements in its estimate.</p></div></div><div className="feature-grid">{features.map(([name, description], index) => <div className="feature-item" key={name}><span className="feature-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{name}</strong><small>{description}</small></span></div>)}</div></aside>;
}
