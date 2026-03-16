# ⚡ Asset Price Predictor AI

A modern, animated React frontend for an AI-powered asset price prediction platform.

---

## 🚀 Setup Instructions (Step by Step)

### Prerequisites
Make sure you have installed:
- **Node.js** v16+ → https://nodejs.org
- **npm** (comes with Node)

Check versions:
```bash
node -v
npm -v
```

---

### Step 1: Create the project folder

You already have all the files. Just place them in a folder called `asset-price-predictor/`.

Or clone/download them into that folder.

---

### Step 2: Install dependencies

Open a terminal in the project root folder and run:

```bash
npm install
```

This will install:
- React 18
- Material UI (MUI v5)
- GSAP (animations)
- Three.js + React Three Fiber (3D hero)
- Recharts (market charts)
- react-intersection-observer

---

### Step 3: Start the development server

```bash
npm start
```

The app will open at → **http://localhost:3000**

---

### Step 4: Build for production

```bash
npm run build
```

Output goes to the `build/` folder, ready for deployment on Vercel, Netlify, etc.

---

## 📁 Project Structure

```
asset-price-predictor/
│
├── public/
│   └── index.html               # HTML shell with Google Fonts
│
├── src/
│   ├── index.js                 # React root entry
│   ├── App.js                   # Main app with page routing
│   │
│   ├── components/
│   │   ├── Navbar.js            # Sticky nav with GSAP hover underlines
│   │   ├── HeroSection.js       # Hero with 3D Three.js + particle canvas
│   │   ├── CategoriesSection.js # 8 animated prediction category cards
│   │   ├── HowItWorksSection.js # 3-step workflow with scroll animations
│   │   ├── MarketInsightsSection.js  # Interactive Recharts graphs
│   │   └── Footer.js            # Footer with social links
│   │
│   ├── pages/
│   │   └── PredictionPage.js    # Full prediction form + animated result
│   │
│   └── data/
│       └── categories.js        # All 8 asset category configs & form fields
│
├── package.json
└── README.md
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 (JS) | Core framework |
| Material UI v5 | Component library |
| GSAP 3 | All animations |
| Three.js / R3F | 3D floating icons in hero |
| Recharts | Market insight charts |
| react-intersection-observer | Scroll-triggered reveals |

---

## ✨ Features

- **Hero Section** — Animated 3D floating cubes, particle network, gradient text shimmer
- **8 Category Cards** — Tilt-on-hover 3D effect, staggered scroll reveals
- **How It Works** — Alternating slide-in steps with scroll triggers
- **Market Insights** — Switchable Area/Line charts (Car, House, Gold)
- **Prediction Form** — Per-category dynamic fields, animated loading bar, price counter animation
- **Navbar** — GSAP underline hover effect, mobile drawer
- **Footer** — Social icons, animated reveal

---

## 🎯 Adding a Backend

To connect a real ML backend, replace the `simulatePrediction()` function in `src/pages/PredictionPage.js` with an API call:

```javascript
const response = await fetch('https://your-api.com/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ category: category.id, ...formData }),
});
const data = await response.json();
setResult(data);
```