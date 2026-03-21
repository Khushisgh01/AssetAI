from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

from predictors.house_predictor import predict_house
from predictors.car_predictor import predict_car
from predictors.bike_predictor import predict_bike
from predictors.gold_predictor import predict_gold
from predictors.silver_predictor import predict_silver
from predictors.platinum_predictor import predict_platinum
from predictors.plot_predictor import predict_plot
from predictors.rental_predictor import predict_rental

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "AssetAI backend is running ✅"})


@app.route("/predict/<category>", methods=["POST"])
def predict(category):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    predictors = {
        "house":    predict_house,
        "car":      predict_car,
        "bike":     predict_bike,
        "gold":     predict_gold,
        "silver":   predict_silver,
        "platinum": predict_platinum,
        "plot":     predict_plot,
        "rental":   predict_rental,
    }

    if category not in predictors:
        return jsonify({"error": f"Unknown category: {category}"}), 404

    try:
        result = predictors[category](data)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)