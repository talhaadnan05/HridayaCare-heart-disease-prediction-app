import { useState } from "react";
import PatientForm from "../components/PatientForm";
import PredictionResult from "../components/PredictionResult";
import FeatureInfo from "../components/FeatureInfo";

const API_URL = "http://localhost:8000";

export default function Prediction({ onPrediction }) {
  const [result, setResult] = useState(null);
  const [values, setValues] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(patientValues) {
    setLoading(true);
    setError("");
    setResult(null);
    setValues(null);
    try {
      const response = await fetch(`${API_URL}/predict`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patientValues) });
      let body;
      try { body = await response.json(); } catch { body = {}; }
      if (!response.ok) throw new Error(body.detail || "The prediction service could not process this profile.");
      setResult(body);
      setValues(patientValues);
      onPrediction?.(body);
    } catch (caught) {
      setError(caught instanceof TypeError ? "Unable to connect to the prediction service." : (caught.message || "Unable to connect to the prediction service."));
    } finally {
      setLoading(false);
    }
  }
  return <section className="prediction-page">
    <div className="prediction-main">
      <div className="page-heading"><p className="eyebrow">Patient screening</p><h1>Check a patient profile</h1><p className="lead">Enter clinical measurements to generate a machine learning estimate.</p></div>
      <PatientForm onSubmit={submit} loading={loading} />
      <FeatureInfo />
    </div>
    <PredictionResult result={result} values={values} loading={loading} error={error} />
  </section>;
}
