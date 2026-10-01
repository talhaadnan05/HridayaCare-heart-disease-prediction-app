from pydantic import BaseModel, Field


class PatientInput(BaseModel):
    age: float = Field(..., ge=18, le=120, description="Patient age in years")
    sex: int = Field(..., ge=0, le=1, description="0 female, 1 male")
    cp: int = Field(..., ge=0, le=3, description="Chest pain type, 0 to 3")
    trestbps: float = Field(..., ge=80, le=250, description="Resting blood pressure")
    chol: float = Field(..., ge=50, le=700, description="Serum cholesterol")
    thalach: float = Field(..., ge=50, le=250, description="Maximum heart rate")
    exang: int = Field(..., ge=0, le=1, description="Exercise-induced angina")
    oldpeak: float = Field(..., ge=0, le=10, description="ST depression")


class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    risk_level: str
    disclaimer: str