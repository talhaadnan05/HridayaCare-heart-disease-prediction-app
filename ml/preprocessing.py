"""Data loading and preprocessing for the heart outcome dataset."""

from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

DATA_PATH = Path(__file__).resolve().parents[1] / "dataset" / "heart.csv"
FEATURES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "thalach",
    "exang",
    "oldpeak",
]
TARGET = "target"


def load_data(path: Path = DATA_PATH) -> tuple[pd.DataFrame, pd.Series]:
    data = pd.read_csv(path)
    required = set(FEATURES + [TARGET])
    missing = required.difference(data.columns)
    if missing:
        raise ValueError(f"Dataset is missing required columns: {sorted(missing)}")
    data = data[FEATURES + [TARGET]].dropna()
    return data[FEATURES], data[TARGET].astype(int)


def build_pipeline() -> Pipeline:
    return Pipeline(
        [
            ("scaler", StandardScaler()),
        ]
    )


def split_data(
    features: pd.DataFrame, target: pd.Series
) -> tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    return train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
        stratify=target,
    )