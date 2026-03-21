# AssetAI – Full-Stack Setup Guide
### ML-powered price predictor for Cars, Bikes, Houses, Plots, Gold, Silver, Platinum & Rentals

---

## Project Structure

```
asset-price-predictor/
├── backend/
│   ├── app.py                    ← Flask API (NEW)
│   ├── requirements.txt          ← Python deps (NEW)
│   ├── data/                     ← Download datasets here (see Step 2)
│   │   ├── HousePricePrediction.csv    ← your uploaded file
│   │   ├── vehicle_dataset.csv
│   │   ├── bike_details.csv
│   │   ├── gold_price_data.csv
│   │   ├── House_Rent_Dataset.csv
│   │   ├── india_house_price.csv
│   │   └── platinum_price_data.csv    (optional)
│   ├── models/                   ← Auto-created on first run
│   └── predictors/
│       ├── __init__.py
│       ├── house_predictor.py    ← uses YOUR notebook's logic
│       ├── car_predictor.py
│       ├── bike_predictor.py
│       ├── gold_predictor.py
│       ├── silver_predictor.py
│       ├── platinum_predictor.py
│       ├── plot_predictor.py
│       └── rental_predictor.py
├── src/
│   └── pages/
│       └── PredictionPage.js     ← Updated (calls real API)
└── ... (rest of React files unchanged)
```

---

## Step 1 – Clone / Open the project

Open your project folder in VS Code or any terminal.

---

## Step 2 – Download Datasets

Download each CSV and place it in `backend/data/`:

| Predictor   | Dataset Name                       | Kaggle URL                                                                                   |
|-------------|-------------------------------------|----------------------------------------------------------------------------------------------|
| **House**   | `HousePricePrediction.csv`          | ✅ Already uploaded by you – just copy to `backend/data/`                                    |
| **Car**     | `vehicle_dataset.csv`               | https://www.kaggle.com/datasets/nehalbirla/vehicle-dataset-from-cardekho                    |
| **Bike**    | `bike_details.csv`                  | https://www.kaggle.com/datasets/nehalbirla/motorcycle-dataset                               |
| **Gold/Silver** | `gold_price_data.csv`           | https://www.kaggle.com/datasets/sid321axn/gold-price-prediction-dataset                     |
| **Rental**  | `House_Rent_Dataset.csv`            | https://www.kaggle.com/datasets/iamsouravbanerjee/house-rent-prediction-dataset             |
| **Plot**    | `india_house_price.csv`             | https://www.kaggle.com/datasets/ruchi798/housing-prices-in-metropolitan-areas-of-india      |
| **Platinum**| `platinum_price_data.csv`           | https://www.kaggle.com/datasets/frtgnn/precious-metals-dataset *(optional – falls back to formula)* |

> **Tip:** You need a free Kaggle account to download. Use `kaggle datasets download -d <path>` CLI or download via browser.

---

## Step 3 – Set Up Python Backend

### 3.1 – Create a virtual environment

```bash
cd backend
python -m venv venv
```

Activate it:
- **Windows:**   `venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

### 3.2 – Install dependencies

```bash
pip install -r requirements.txt
```

### 3.3 – Copy your dataset

```bash
# From project root:
cp /path/to/HousePricePrediction.csv backend/data/
# (and all other CSVs downloaded in Step 2)
```

### 3.4 – Run the Flask server

```bash
cd backend
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
```

The **first run** will train and save all models automatically (may take ~30s). Subsequent runs load from disk instantly.

---

## Step 4 – Set Up React Frontend

Open a **new terminal** (keep Flask running):

```bash
# From project root:
npm install
npm start
```

React opens at `http://localhost:3000`.

---

## Step 5 – How It Works (End to End)

```
User fills form  →  React PredictionPage.js
    → POST http://localhost:5000/predict/{category}
        → Flask app.py routes to correct predictor
            → predictor loads model (trains if not cached)
                → returns { price, low, high, confidence, model }
    → React shows animated result card
```

---

## Step 6 – Environment Variables (Optional)

If your backend runs on a different port or URL (e.g. deployed):

Create `.env` in the React root:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Model Details

| Category  | Dataset                        | Algorithm              | Features Used                              |
|-----------|-------------------------------|------------------------|--------------------------------------------|
| House     | Ames Housing (your notebook)  | Linear Regression      | LotArea, YearBuilt, OverallCond, Zoning…  |
| Car       | CarDekho Vehicle Dataset      | Random Forest          | Year, km_driven, fuel, transmission, owner |
| Bike      | Kaggle Bike Details           | Random Forest          | Year, km_driven, owner, ex_showroom_price  |
| Gold      | Kaggle Gold Price Data        | Spot-price formula     | Weight × Purity × Form premium             |
| Silver    | Same as Gold (SLV column)     | Linear Regression      | GLD → SLV ratio                            |
| Platinum  | Precious Metals Dataset       | Spot-price formula     | Weight × Purity × Form premium             |
| Plot      | India Housing (Metro areas)   | Random Forest          | Area, City, Zone, Road, Approval           |
| Rental    | House Rent Dataset (India)    | Random Forest          | BHK, Area, Furnishing, City, Bathroom      |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot reach the backend` | Make sure Flask is running: `python app.py` in `backend/` |
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` inside virtualenv |
| Model accuracy is low (house) | Your notebook uses ~37% R² with Linear Regression. Consider upgrading to `RandomForestRegressor` or `XGBRegressor` |
| Dataset column error | Check your CSV column names match what the predictor expects (each predictor has a column-mapping section) |
| CORS error | Flask already has `flask-cors` installed. Make sure `CORS(app)` is in `app.py` |

---

## Upgrading the House Model (Optional)

In `house_predictor.py`, replace the `LinearRegression` model with:

```python
from sklearn.ensemble import GradientBoostingRegressor
model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1, random_state=42)
```

This typically boosts R² from ~0.37 to ~0.85+.

---

Built with ⚡ React + MUI + GSAP + Flask + scikit-learn