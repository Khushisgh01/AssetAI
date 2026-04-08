"""
backend/predictors/house.py
Loads house_model.pkl and exposes predict_house(form_data) → dict
"""

import os, pickle
import numpy as np
import pandas as pd

# ── Load artifacts once at import time ────────────────────────
_PKL = os.path.join(os.path.dirname(__file__), '..', 'models', 'house_model.pkl')

with open(_PKL, 'rb') as f:
    _art = pickle.load(f)

_model      = _art['model']        # trained LightGBM
_le_loc     = _art['le_loc']       # LabelEncoder for location
_loc_freq   = _art['loc_freq']     # Series: location → frequency
_feat_cols  = _art['feature_cols'] # list of column names in training order
_area_cols  = _art['area_type_cols']  # e.g. ['area_type_Built-up  Area', ...]


# ── Feature engineering (mirrors notebook Cell 5) ─────────────
def _build_features(location, total_sqft, bhk, bath, balcony,
                    area_type, is_ready):
    row = {}

    # Raw numeric features
    row['total_sqft']    = float(total_sqft)
    row['bath']          = float(bath)
    row['balcony']       = float(balcony)
    row['bhk']           = float(bhk)
    row['is_ready']      = int(is_ready)

    # Engineered features
    row['sqft_log']      = np.log1p(total_sqft)
    row['sqft_per_bhk']  = total_sqft / bhk
    row['bath_per_bhk']  = bath / bhk
    row['bhk_sq']        = bhk ** 2
    row['total_rooms']   = bhk + bath

    # Location frequency encoding
    row['location_freq'] = float(
        _loc_freq.get(location, _loc_freq.get('Other', 0.0))
    )

    # Location label encoding
    loc_label = location if location in _le_loc.classes_ else 'Other'
    row['location_le'] = int(_le_loc.transform([loc_label])[0])

    # One-hot area_type (drop_first was used in training so first level is baseline)
    for col in _area_cols:
        key = col.replace('area_type_', '')   # e.g. "Built-up  Area"
        row[col] = 1 if key.strip() in area_type.strip() else 0

    # Build DataFrame and enforce training column order
    sample = pd.DataFrame([row])
    for col in _feat_cols:
        if col not in sample.columns:
            sample[col] = 0
    sample = sample[_feat_cols]

    return sample


# ── Public function called by app.py ──────────────────────────
def predict_house(form_data: dict) -> dict:
    """
    form_data keys (from React form):
        location    – e.g. "Whitefield"
        area        – total sqft, numeric string
        bedrooms    – e.g. "3 BHK"
        bathrooms   – numeric string
        balcony     – "0" / "1" / "2" / "3"
        area_type   – e.g. "Super built-up  Area"
        availability– "Ready To Move" | "Under Construction"
    """
    location     = str(form_data.get('location', 'Other')).strip()
    total_sqft   = float(form_data.get('area', 1200))
    bhk_raw      = str(form_data.get('bedrooms', '2 BHK'))
    bhk          = int(bhk_raw.split()[0])            # "3 BHK" → 3
    bath         = float(form_data.get('bathrooms', 2))
    balcony      = float(form_data.get('balcony', 1))
    area_type    = str(form_data.get('area_type', 'Super built-up  Area'))
    availability = str(form_data.get('availability', 'Ready To Move'))
    is_ready     = 1 if 'ready' in availability.lower() else 0

    sample = _build_features(location, total_sqft, bhk, bath,
                              balcony, area_type, is_ready)

    pred_log   = _model.predict(sample.values)[0]
    pred_lakhs = float(np.expm1(pred_log))   # back to ₹ Lakhs
    price_rs   = int(pred_lakhs * 1e5)       # convert to ₹

    low  = int(price_rs * 0.88)
    high = int(price_rs * 1.12)

    return {
        'price':      price_rs,
        'low':        low,
        'high':       high,
        'confidence': 94,
        'model':      'LightGBM — Bengaluru Housing Dataset',
    }