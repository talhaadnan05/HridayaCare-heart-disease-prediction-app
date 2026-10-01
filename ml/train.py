"""Train and persist the outcome prediction model."""

from pathlib import Path

import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from preprocessing import FEATURES, load_data

MODEL_PATH = Path(__file__).resolve().parent / "model.pkl"


def train() -> None:
    features, target = load_data()
    # In this dataset, target=0 is the heart disease class and target=1 is
    # the no-disease class. Encode disease as the positive class so the API's
    # probability and risk level increase with disease-associated patterns.
    disease_target = (target == 0).astype(int)
    model = Pipeline(
        [
            ("scaler", StandardScaler()),
            ("classifier", LogisticRegression(max_iter=1000, random_state=42)),
        ]
    )
    model.fit(features[FEATURES], disease_target)
    joblib.dump({"model": model, "features": FEATURES}, MODEL_PATH)
    print(f"Saved model trained on {len(features)} rows to {MODEL_PATH}")


if __name__ == "__main__":
    train()
