# HridayaCare: Heart Outcome Prediction

An educational full-stack machine-learning app built from `dataset/heart.csv`.

## Dataset

The supplied CSV is the standard heart disease dataset. In this file, `target=0` represents heart disease and `target=1` represents no heart disease. Training maps the disease rows to the model's positive class so the returned probability represents the model-estimated heart disease outcome. The model uses age, sex, chest pain type, resting blood pressure, cholesterol, maximum heart rate, exercise-induced angina, and ST depression. It does not replace clinical diagnosis.

## Run it

### API

```powershell
cd backend
python -m pip install -r requirements.txt
cd ..\ml
python train.py
cd ..\backend
uvicorn main:app --reload
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal. This is a demonstration only and is not medical advice.
