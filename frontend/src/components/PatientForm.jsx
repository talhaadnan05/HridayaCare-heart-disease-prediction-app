import { useState } from "react";

const initialForm = { age: "", sex: "1", cp: "3", trestbps: "", chol: "", thalach: "", exang: "0", oldpeak: "" };

function Field({ id, label, unit, hint, children }) {
  return <label className="field" htmlFor={id}><span className="field-heading"><span>{label}</span>{unit && <small>{unit}</small>}</span>{children}{hint && <span className="field-hint">{hint}</span>}</label>;
}

export default function PatientForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);
  const update = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    onSubmit({ age: Number(form.age), sex: Number(form.sex), cp: Number(form.cp), trestbps: Number(form.trestbps), chol: Number(form.chol), thalach: Number(form.thalach), exang: Number(form.exang), oldpeak: Number(form.oldpeak) });
  };
  return (
    <form className="patient-form" onSubmit={submit}>
      <section className="form-section">
        <div className="section-heading"><span className="section-icon">01</span><div><h2>Patient profile</h2><p>Basic demographic information</p></div></div>
        <div className="field-grid">
          <Field id="age" label="Age" unit="years"><input id="age" name="age" type="number" min="18" max="120" required value={form.age} onChange={update} placeholder="Enter age" /></Field>
          <Field id="sex" label="Sex"><select id="sex" name="sex" value={form.sex} onChange={update}><option value="1">Male</option><option value="0">Female</option></select></Field>
        </div>
      </section>
      <section className="form-section">
        <div className="section-heading"><span className="section-icon">02</span><div><h2>Cardiovascular measurements</h2><p>Enter clinical readings in the units shown</p></div></div>
        <div className="field-grid">
          <Field id="trestbps" label="Resting blood pressure" unit="mmHg"><input id="trestbps" name="trestbps" type="number" min="80" max="250" required value={form.trestbps} onChange={update} placeholder="Enter reading" /></Field>
          <Field id="chol" label="Cholesterol" unit="mg/dL"><input id="chol" name="chol" type="number" min="50" max="700" required value={form.chol} onChange={update} placeholder="Enter reading" /></Field>
          <Field id="thalach" label="Maximum heart rate" unit="bpm"><input id="thalach" name="thalach" type="number" min="50" max="250" required value={form.thalach} onChange={update} placeholder="Enter reading" /></Field>
        </div>
      </section>
      <section className="form-section">
        <div className="section-heading"><span className="section-icon">03</span><div><h2>Clinical indicators</h2><p>Symptoms and exercise response</p></div></div>
        <div className="field-grid">
          <Field id="cp" label="Chest pain type"><select id="cp" name="cp" value={form.cp} onChange={update}><option value="3">Typical angina</option><option value="2">Atypical angina</option><option value="1">Non-anginal pain</option><option value="0">Asymptomatic</option></select></Field>
          <Field id="exang" label="Exercise-induced angina"><select id="exang" name="exang" value={form.exang} onChange={update}><option value="0">No</option><option value="1">Yes</option></select></Field>
          <Field id="oldpeak" label="ST depression (Oldpeak)" unit="mm"><input id="oldpeak" name="oldpeak" type="number" min="0" max="10" step="0.1" required value={form.oldpeak} onChange={update} placeholder="Enter reading" /></Field>
        </div>
      </section>
      <button className="primary-button calculate-button" type="submit" disabled={loading}>{loading ? <><span className="button-spinner" /> Analyzing...</> : <>Calculate risk <span aria-hidden="true">↗</span></>}</button>
      <p className="form-footnote">For educational use. This estimate is not a medical diagnosis.</p>
    </form>
  );
}
