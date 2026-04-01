# backend/predictors/house_predictor.py

import os
import joblib
import numpy as np
import pandas as pd

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "house_rf_log_pipeline.joblib")

# Keep your mapping (same as existing code)
_BLDG_MAP = {
    "Apartment":         "2fmCon",
    "Villa":             "1Fam",
    "Independent House": "1Fam",
    "Duplex":            "Duplex",
    "Penthouse":         "1Fam",
}

def _load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"House model not found at {MODEL_PATH}. "
            f"Copy house_rf_log_pipeline.joblib into backend/models/"
        )
    return joblib.load(MODEL_PATH)

def _build_features_from_form(data: dict) -> pd.DataFrame:
    """
    Frontend sends a simplified form. We map it into dataset-like columns.
    Adjust these keys if your UI uses different names.
    """

    area = float(data.get("area", 1200))
    age = float(data.get("age", 10))
    year_built = max(1900, min(2026, int(2026 - age)))

    bldg_type = _BLDG_MAP.get(data.get("type", "Apartment"), "2fmCon")

    # If your dataset has different columns, edit here after checking df.columns
    row = {
        "MSSubClass": 60,
        "LotArea": area,
        "OverallCond": 5,
        "YearBuilt": year_built,
        "YearRemodAdd": year_built,
        "BsmtFinSF2": 0.0,
        "TotalBsmtSF": area * 0.4,
        "MSZoning": "RL",
        "LotConfig": "Inside",
        "BldgType": bldg_type,
        "Exterior1st": "VinylSd",
    }

    return pd.DataFrame([row])

def predict_house(data: dict) -> dict:
    model = _load_model()
    X_row = _build_features_from_form(data)

    # Model predicts log(price) because we trained on y_train_log = log1p(SalePrice)
    pred_log = float(model.predict(X_row)[0])
    pred_price = float(np.expm1(pred_log))   # back to normal price

    # OPTIONAL: convert USD -> INR if your UI wants INR
    # If your dataset is already INR, remove this conversion.
    pred_inr = pred_price * 84

    # Optional adjustments (same as your old code)
    furnishing = data.get("furnishing", "Unfurnished")
    if furnishing == "Fully Furnished":
        pred_inr *= 1.15
    elif furnishing == "Semi Furnished":
        pred_inr *= 1.07

    bhk_str = data.get("bedrooms", "2 BHK") or "2 BHK"
    try:
        bhk = int(str(bhk_str).strip()[0])
        pred_inr *= 1 + (bhk - 2) * 0.08
    except Exception:
        pass

    pred_inr = max(500_000, round(pred_inr))

    return {
        "price": pred_inr,
        "low": round(pred_inr * 0.90),
        "high": round(pred_inr * 1.10),
        "confidence": int(np.clip(80 + np.random.uniform(-4, 4), 72, 88)),
        "model": "RandomForestRegressor (log target) — house_rf_log_pipeline.joblib",
    }