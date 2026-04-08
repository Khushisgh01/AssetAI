from flask import Flask, request, jsonify
from flask_cors import CORS
from predictors.house import predict_house

app = Flask(__name__)
CORS(app)

# ── House ──────────────────────────────────────────────────────
@app.route('/predict/house', methods=['POST'])
def house():
    try:
        result = predict_house(request.json)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ── Placeholders for future predictors ────────────────────────
@app.route('/predict/car',      methods=['POST'])
@app.route('/predict/bike',     methods=['POST'])
@app.route('/predict/plot',     methods=['POST'])
@app.route('/predict/gold',     methods=['POST'])
@app.route('/predict/silver',   methods=['POST'])
@app.route('/predict/platinum', methods=['POST'])
@app.route('/predict/rental',   methods=['POST'])
def coming_soon():
    name = request.path.split('/')[-1].capitalize()
    return jsonify({'error': f'{name} predictor coming soon — model not yet integrated.'}), 501

if __name__ == '__main__':
    app.run(debug=True, port=5000)