"""Evaluate the trained model on a held-out test split."""

from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

from preprocessing import load_data, split_data
from train import MODEL_PATH
import joblib


def evaluate() -> None:
    features, target = load_data()
    _, test_features, _, test_target = split_data(features, target)
    artifact = joblib.load(MODEL_PATH)
    model = artifact["model"]
    predictions = model.predict(test_features)
    probabilities = model.predict_proba(test_features)[:, 1]
    print(f"Accuracy: {accuracy_score(test_target, predictions):.3f}")
    print(f"ROC AUC: {roc_auc_score(test_target, probabilities):.3f}")
    print(classification_report(test_target, predictions, zero_division=0))


if __name__ == "__main__":
    evaluate()