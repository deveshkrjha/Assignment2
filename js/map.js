// ============================================================
// Leaflet Map + Heatmap Visualization
// ============================================================

const MapView = (() => {
  let map = null;
  let heatLayer = null;
  let markersLayer = null;
  let currentMode = "heatmap"; // 'heatmap' or 'markers'

  // Tier colors
  const TIER_COLORS = {
    HOT: "#ff4757",
    WARM: "#ff9f43",
    EMERGING: "#00e676",
    STABLE: "#74b9ff",
  };

  const TIER_ICONS = {
    HOT: "🔴",
    WARM: "🟡",
    EMERGING: "🟢",
    STABLE: "🔵",
  };

  // City centers for fly-to
  const CITY_CENTERS = {
    "All Cities": { lat: 20.5937, lng: 78.9629, zoom: 5 },
    Pune: { lat: 18.56, lng: 73.85, zoom: 12 },
    Bengaluru: { lat: 12.97, lng: 77.59, zoom: 11 },
    Hyderabad: { lat: 17.44, lng: 78.40, zoom: 11 },
    Mumbai: { lat: 19.15, lng: 73.0, zoom: 10 },
    Noida: { lat: 28.50, lng: 77.40, zoom: 11 },
    Chennai: { lat: 12.90, lng: 80.15, zoom: 11 },
  };

  function init() {
    map = L.map("map", {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Attribution
    L.control
      .attribution({ position: "bottomleft" })
      .addAttribution(
        '&copy; <a href="https://carto.com/">CARTO</a> | Data: Simulated'
      )
      .addTo(map);

    // Initialize layers
    markersLayer = L.layerGroup().addTo(map);

    return map;
  }

  function updateHeatmap(zones) {
    // Remove old heatmap
    if (heatLayer) {
      map.removeLayer(heatLayer);
    }

    const heatData = zones.map((z) => [z.lat, z.lng, z.gvs / 100]);

    heatLayer = L.heatLayer(heatData, {
      radius: 35,
      blur: 25,
      maxZoom: 13,
      max: 1.0,
      gradient: {
        0.0: "#1a1a4e",
        0.25: "#2d6a9f",
        0.5: "#4ecdc4",
        0.7: "#ffe66d",
        0.85: "#ff9f43",
        1.0: "#ff4757",
      },
    });

    if (currentMode === "heatmap") {
      heatLayer.addTo(map);
    }
  }

  function updateMarkers(zones, onZoneClick) {
    markersLayer.clearLayers();

    zones.forEach((z) => {
      const color = TIER_COLORS[z.tier] || "#74b9ff";
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="marker-pin" style="
            background: ${color};
            box-shadow: 0 0 15px ${color}88;
          ">
            <span class="marker-gvs">${z.gvs}</span>
          </div>
          <div class="marker-label">${z.name}</div>
        `,
        iconSize: [40, 55],
        iconAnchor: [20, 55],
        popupAnchor: [0, -55],
      });

      const marker = L.marker([z.lat, z.lng], { icon }).addTo(markersLayer);

      // Popup
      const popupContent = `
        <div class="map-popup">
          <div class="popup-header">
            <h3>${z.name}</h3>
            <span class="popup-tier tier-${z.tier.toLowerCase()}">${z.tier}</span>
          </div>
          <div class="popup-city">${z.city} · ${z.ward}</div>
          <div class="popup-scores">
            <div class="popup-score">
              <span class="popup-score-label">GVS</span>
              <span class="popup-score-value" style="color: ${color}">${z.gvs}</span>
            </div>
            <div class="popup-score">
              <span class="popup-score-label">Infra</span>
              <span class="popup-score-value">${z.infraScore}</span>
            </div>
            <div class="popup-score">
              <span class="popup-score-label">Momentum</span>
              <span class="popup-score-value">${z.momentum}</span>
            </div>
          </div>
          ${z.latestMarket ? `
          <div class="popup-market">
            <div>₹${z.latestMarket.avgPriceSqft_sell.toLocaleString()}/sqft</div>
            <div>YoY: +${z.latestMarket.yoyPriceChange_pct}%</div>
            <div>${z.latestMarket.listingCount} listings</div>
          </div>
          ` : ""}
          <div class="popup-declarations">${z.declarationCount} Infrastructure Projects</div>
          <button class="popup-btn" onclick="App.selectZone('${z.id}')">View Details →</button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 320,
        className: "dark-popup",
      });

      marker.on("click", () => {
        if (onZoneClick) onZoneClick(z);
      });
    });
  }

  function flyTo(city) {
    const target = CITY_CENTERS[city] || CITY_CENTERS["All Cities"];
    map.flyTo([target.lat, target.lng], target.zoom, {
      animate: true,
      duration: 1.5,
    });
  }

  function setMode(mode) {
    currentMode = mode;
    if (mode === "heatmap") {
      if (heatLayer) heatLayer.addTo(map);
      markersLayer.eachLayer((layer) => {
        layer.setOpacity && layer.setOpacity(0.6);
      });
    } else {
      if (heatLayer) map.removeLayer(heatLayer);
      markersLayer.eachLayer((layer) => {
        layer.setOpacity && layer.setOpacity(1);
      });
    }
  }

  function toggleMode() {
    setMode(currentMode === "heatmap" ? "markers" : "heatmap");
    return currentMode;
  }

  function getMap() {
    return map;
  }

  return {
    init,
    updateHeatmap,
    updateMarkers,
    flyTo,
    setMode,
    toggleMode,
    getMap,
    CITY_CENTERS,
  };
})();
