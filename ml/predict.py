"""Prediction helpers shared by the API and command line use."""

from pathlib import Path

import joblib
import pandas as pd

MODEL_PATH = Path(__file__).resolve().parent / "model.pkl"


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model not found at {MODEL_PATH}. Run `python train.py` first."
        )
    return joblib.load(MODEL_PATH)["model"]


def predict_outcome(
    age: float,
    sex: int,
    cp: int,
    trestbps: float,
    chol: float,
    thalach: float,
    exang: int,
    oldpeak: float,
) -> dict[str, float | int | str]:
    model = load_model()
    values = pd.DataFrame(
        [
            {
                "age": age,
                "sex": sex,
                "cp": cp,
                "trestbps": trestbps,
                "chol": chol,
                "thalach": thalach,
                "exang": exang,
                "oldpeak": oldpeak,
            }
        ]
    )
    # Training maps the dataset's original target=0 (disease) to class 1.
    disease_class_index = list(model.classes_).index(1)
    probability = float(model.predict_proba(values)[0, disease_class_index])
    predicted_class = int(probability >= 0.5)
    risk = "high" if probability >= 0.65 else "moderate" if probability >= 0.35 else "low"
    return {
        "prediction": predicted_class,
        "probability": round(probability, 4),
        "risk_level": risk,
    }
