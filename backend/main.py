import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "ml"))
from predict import predict_outcome  # noqa: E402

from schemas import PatientInput, PredictionResponse

app = FastAPI(
    title="Heart Outcome Prediction API",
    description="Prediction service trained on the project's heart.csv dataset.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DISCLAIMER = (
    "This is an educational dataset-based estimate, not a medical diagnosis. "
    "Consult a qualified healthcare professional."
)


@app.get("/", response_class=HTMLResponse)
def root() -> str:
    return """
    <!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"><title>Heart Outcome Prediction API</title></head>
      <body style="font-family:system-ui;max-width:680px;margin:60px auto;padding:0 24px">
        <h1>Heart Outcome Prediction API</h1>
        <p>The backend is running successfully.</p>
        <p>Open the frontend at
          <a href="http://localhost:5173">http://localhost:5173</a>.
        </p>
        <p>API documentation: <a href="/docs">/docs</a></p>
      </body>
    </html>
    """


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict(patient: PatientInput) -> PredictionResponse:
    try:
        result = predict_outcome(
            patient.age,
            patient.sex,
            patient.cp,
            patient.trestbps,
            patient.chol,
            patient.thalach,
            patient.exang,
            patient.oldpeak,
        )
    except FileNotFoundError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    return PredictionResponse(**result, disclaimer=DISCLAIMER)