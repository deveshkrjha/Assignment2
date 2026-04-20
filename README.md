# 📊 Urban Growth Analytics — Predictive Real Estate Intelligence Engine

A standalone, data-driven **Predictive Geospatial Analytics Engine** for real estate investment analysis. The dashboard visualizes **High-Growth Zones** across 6 major Indian metro cities by integrating municipal infrastructure declarations with real-time market intelligence, helping investors identify undervalued micro-markets primed for appreciation.

---

## 🎯 Objective

The goal of this project is to build an interactive web-based dashboard that:

1. **Identifies future development hotspots** by correlating government infrastructure projects (metro lines, expressways, airports, IT parks) with real estate market trends.
2. **Computes a Growth Velocity Score (GVS)** — a composite index that ranks every micro-market zone on a 0–100 scale.
3. **Visualizes multi-dimensional data** on an interactive geospatial heatmap and through rich Chart.js analytics.
4. **Projects future growth** over a configurable time horizon (12–60 months).

---

## 🏗️ Architecture Overview

```
Assignment2/
│
├── index.html              # Main entry point — single-page application
├── styles.css              # Complete styling (dark theme, glassmorphism, responsive)
│
├── data/                   # Simulated datasets
│   ├── zones.js            # 30 micro-market zone definitions (6 cities × 5 zones)
│   ├── municipal.js        # ~50 government infrastructure declarations
│   └── market.js           # Quarterly market snapshots (Q1-2025 → Q1-2026)
│
└── js/                     # Application logic
    ├── engine.js           # GVS computation engine (scoring algorithm)
    ├── map.js              # Leaflet.js map + heatmap visualization
    ├── charts.js           # Chart.js visualizations (bar, scatter, doughnut, line)
    └── app.js              # Application controller (events, KPIs, zone selection)
```

---

## 🔬 Growth Velocity Score (GVS) Algorithm

The core of the engine is the **Growth Velocity Score** — a weighted composite of three sub-scores:

| Component               | Weight | Range  | What It Measures                                              |
|--------------------------|--------|--------|---------------------------------------------------------------|
| **Infrastructure Score** | 40%    | 0–100  | Impact of municipal declarations (type, budget, status)       |
| **Market Momentum**      | 35%    | 0–100  | YoY price change, listing density, search volume, absorption  |
| **Undervaluation Index** | 25%    | 0–100  | Rental yield vs city average, price gap vs neighboring zones  |

### Tier Classification

| Tier       | GVS Range | Meaning                                      |
|------------|-----------|----------------------------------------------|
| 🔴 **HOT**      | 70–100    | High-growth zone — strong buy signal         |
| 🟡 **WARM**     | 50–69     | Moderate growth — monitor closely             |
| 🟢 **EMERGING** | 30–49     | Early-stage growth — potential opportunity    |
| 🔵 **STABLE**   | 0–29      | Mature market — steady, lower upside          |

### Infrastructure Scoring Weights

Each municipal declaration is scored based on its **type**, **construction status**, and **budget**:

```
Score = TypeWeight × StatusMultiplier × (0.5 + BudgetFactor × 0.5)
```

| Project Type     | Base Weight | Status          | Multiplier |
|------------------|-------------|-----------------|------------|
| Metro Line       | 25          | Announced       | 0.6×       |
| Airport          | 22          | Approved        | 1.0×       |
| Expressway       | 20          | Under Construction | 1.3×    |
| IT Park / SEZ    | 18          | Completed       | 0.3×       |
| Zoning Change    | 15          |                 |            |
| Flyover          | 12          |                 |            |
| Road Widening    | 10          |                 |            |
| Sewage / Water   | 8           |                 |            |

---

## 🗺️ Features

### Interactive Geospatial Map
- **Heatmap Mode** — Density overlay showing GVS intensity across all zones
- **Marker Mode** — Individual zone markers with GVS scores, color-coded by tier
- **Fly-To Navigation** — Smooth animated transitions when switching between cities
- **Click-To-Explore** — Click any marker to open the full zone detail panel
- Dark-themed CartoDB basemap tiles for a clean analytical look

### City-Level Filtering
- Filter by: **Pune**, **Bengaluru**, **Hyderabad**, **Mumbai**, **Noida/NCR**, **Chennai**
- Or view **All Cities** for a pan-India perspective
- KPIs, charts, and map auto-update on filter change

### KPI Dashboard
- Total Zones analyzed
- Average GVS across selected city
- Total infrastructure projects tracked
- Active real estate listings
- Number of "Hot" zones
- Top-ranked zone highlight

### Zone Detail Panel
When you click a zone, the right panel reveals:
- **Score Badges** — GVS, Infrastructure, Momentum, Undervaluation scores
- **Market Snapshot** — Price/sqft, rent/sqft, YoY change, rental yield, listings, absorption rate
- **Price Trend Chart** — Quarterly price movement (sell + rent) as a line chart
- **GVS Gauge** — Doughnut chart breaking down the three score components
- **Growth Projections** — Future GVS and price/sqft estimates on a timeline
- **Infrastructure Pipeline** — Stacked bar chart of project statuses by type
- **Municipal Declarations** — Detailed cards for each government project

### Bottom Analytics Panel
- **Top Growth Zones** — Horizontal bar chart ranking all zones by GVS
- **Undervaluation Map** — Scatter plot of Rental Yield vs Selling Price to spot undervalued pockets

### Growth Projection Engine
- Adjustable time horizon slider: **12 to 60 months**
- Extrapolates price and GVS trends based on historical quarterly data
- Accounts for infrastructure completion boosts

---

## 📊 Data Sources (Simulated)

This project uses **simulated but realistic** data modeled on actual Indian real estate markets:

| Dataset               | Records | Description                                                   |
|------------------------|---------|---------------------------------------------------------------|
| `zones.js`            | 30      | Micro-market zones — lat/lng, city, ward, land use, population, area |
| `municipal.js`        | ~50     | Government infrastructure declarations — type, budget (₹ Cr), status, ETA |
| `market.js`           | 150     | Quarterly snapshots — price/sqft, rent, YoY change, listings, absorption |

### Cities Covered (5 zones each)
| City       | Key Zones                                                |
|------------|----------------------------------------------------------|
| Pune       | Wakad, Hinjewadi, Balewadi, Kharadi, Manjri              |
| Bengaluru  | Whitefield, Sarjapur Road, Electronic City, Hebbal, Devanahalli |
| Hyderabad  | Gachibowli, Kokapet, Narsingi, Shamshabad, Medchal       |
| Mumbai     | Panvel, Thane West, Kharghar, Virar, Dahisar East        |
| Noida/NCR  | Sector 150, Greater Noida West, Yamuna Expressway, Sector 62, Dwarka Expressway |
| Chennai    | OMR (Sholinganallur), Porur, Kelambakkam, Mahindra City, Medavakkam |

---

## 🛠️ Tech Stack

| Technology                        | Purpose                                        |
|------------------------------------|-------------------------------------------------|
| **HTML5 / CSS3 / JavaScript (ES6)** | Core frontend — no build tools required         |
| **Leaflet.js v1.9.4**              | Interactive map rendering and geospatial layers |
| **Leaflet.heat v0.2.0**            | Heatmap overlay for GVS density visualization   |
| **Chart.js v4.4.7**                | Bar, line, scatter, and doughnut charts          |
| **CartoDB Dark Tiles**             | Dark-themed basemap for the geospatial interface |

> **No backend, no database, no build step.** This is a fully client-side application that runs directly in the browser.

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No installations, dependencies, or servers required

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Assignment2.git
   cd Assignment2
   ```

2. **Open in browser**
   ```
   Simply double-click index.html
   ```
   Or use a local development server for best results:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using VS Code
   # Install "Live Server" extension → Right-click index.html → "Open with Live Server"
   ```

3. **Explore the dashboard**
   - Use the **City** dropdown to filter by metro
   - Toggle between **Heatmap** and **Marker** views
   - Click any zone marker to open the detail panel
   - Adjust the **Projection** slider to see future growth estimates

---

## 📁 File Descriptions

| File | Lines | Description |
|------|-------|-------------|
| `index.html` | 257 | Single-page HTML — layout structure, KPI cards, chart canvases, map container |
| `styles.css` | 25,000+ chars | Full dark-theme UI — glassmorphism panels, animations, responsive grid, map popups |
| `data/zones.js` | 348 | 30 zone objects with geographic coordinates, demographic data, and land use classification |
| `data/municipal.js` | 618 | ~50 infrastructure declaration records with type, budget, status, and estimated completion |
| `data/market.js` | 216 | 150 quarterly market data points (5 quarters × 30 zones) |
| `js/engine.js` | 363 | GVS computation engine — infrastructure scoring, momentum, undervaluation, projections |
| `js/map.js` | 210 | Leaflet map initialization, heatmap layer, marker management, fly-to navigation |
| `js/charts.js` | ~400 | Chart.js renderers — price trend, GVS gauge, top zones bar, scatter plot, pipeline |
| `js/app.js` | 307 | Main application controller — event wiring, KPI updates, zone selection, data refresh |

---

## 🔧 How It Works (Data Flow)

```
┌─────────────────────┐
│   Data Layer         │
│  zones.js            │
│  municipal.js        │──────┐
│  market.js           │      │
└─────────────────────┘      │
                              ▼
                    ┌──────────────────┐
                    │   Engine.js       │
                    │  • Infra Score    │
                    │  • Momentum      │
                    │  • Undervaluation │
                    │  • GVS = Weighted │
                    │    Composite      │
                    │  • Projections    │
                    └──────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       ┌────────────┐  ┌────────────┐  ┌────────────┐
       │  MapView   │  │  Charts    │  │  App.js    │
       │  (Leaflet) │  │ (Chart.js) │  │ (KPIs +   │
       │  Heatmap + │  │ Bar, Line, │  │  Events)  │
       │  Markers   │  │ Scatter,   │  │           │
       └────────────┘  │ Doughnut   │  └────────────┘
                       └────────────┘
```

1. **Data Layer** → Static JS files simulate real-world municipal and market data
2. **Engine** → Reads all data, computes GVS for each zone, ranks them, and projects future growth
3. **Map** → Renders a Leaflet heatmap + interactive markers on a dark basemap
4. **Charts** → Visualizes trends, rankings, and breakdowns using Chart.js
5. **App Controller** → Wires UI events, manages state (selected city, zone, time horizon)

---

## 📸 Key Interactions

| Action | Result |
|--------|--------|
| Select a city from dropdown | Map flies to city center; KPIs + charts update |
| Click a map marker | Zone detail panel slides open with full analytics |
| Toggle Heatmap ↔ Markers | Switch between density overlay and marker view |
| Drag the projection slider | Growth projections update in real-time (12–60 months) |
| Close zone detail (✕ button) | Returns to placeholder state |

---

## 📝 Academic Context

This project was developed as **Assignment 2** for a geospatial analytics / data visualization course. It demonstrates:

- **Multi-source data integration** — Correlating municipal infrastructure data with market intelligence
- **Composite scoring algorithms** — Weighted multi-factor index design (GVS)
- **Interactive geospatial visualization** — Leaflet.js with heatmaps and custom markers
- **Multi-dimensional charting** — Chart.js for bar, line, scatter, and doughnut visualizations
- **Client-side data processing** — All computation happens in the browser with zero backend dependency
- **Responsive dark-themed UI** — Modern glassmorphism design with micro-animations

---

## 📄 License

This project is for educational purposes. Data is simulated and does not represent real market conditions or investment advice.

---

<p align="center">
  Built with ❤️ using Leaflet.js, Chart.js, and vanilla JavaScript
</p>
