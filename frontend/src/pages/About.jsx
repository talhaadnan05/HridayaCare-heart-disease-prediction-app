const steps = [
  ["01", "Patient information", "Eight clinical and demographic values are entered in the prediction form."],
  ["02", "Data preparation", "Inputs are passed to the existing service using the model's expected feature names."],
  ["03", "Machine learning model", "The trained classification pipeline evaluates the submitted measurements."],
  ["04", "Prediction", "The service returns a predicted class, probability, and risk category."],
  ["05", "Risk visualization", "The frontend presents the response as a clear, easy-to-read estimate."],
];

export default function About() {
  return <section className="about-page">
    <div className="page-heading"><p className="eyebrow">Project overview</p><h1>About HridayaCare</h1><p className="lead">A healthcare analytics interface for exploring a machine learning model trained on heart disease data.</p></div>
    <div className="about-grid">
      <section className="about-card how-card"><div className="card-topline"><span className="card-kicker">The workflow</span><span className="mini-icon blue-icon">↗</span></div><h2>How it works</h2><div className="workflow-list">{steps.map(([number, title, text]) => <div className="workflow-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
      <div className="about-side">
        <section className="about-card stack-card"><div className="card-topline"><span className="card-kicker">Under the hood</span><span className="mini-icon soft-icon">⌘</span></div><h2>Technology stack</h2><div className="tech-list">{["React", "FastAPI", "Python", "Scikit-learn", "Pandas"].map((technology) => <span key={technology}>{technology}</span>)}</div><p className="stack-note">Frontend, API, and model work together to return a probability estimate from the submitted profile.</p></section>
        <section className="important-notice"><div className="notice-icon">!</div><div><span className="card-kicker">Important notice</span><h2>For learning and demonstration</h2><p>This application is intended for educational and demonstration purposes. Model predictions should not be interpreted as a medical diagnosis.</p></div></section>
      </div>
    </div>
  </section>;
}
