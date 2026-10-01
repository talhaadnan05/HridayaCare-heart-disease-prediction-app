export default function RiskCard({ level, text }) {
  const normalized = ["low", "moderate", "high"].includes(level) ? level : "moderate";
  return <span className={`risk-pill ${normalized}`}><i />{level} {text}</span>;
}
