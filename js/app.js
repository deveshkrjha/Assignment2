// ============================================================
// Application Controller
// ============================================================

const App = (() => {
  let currentCity = "All Cities";
  let selectedZoneId = null;
  let timeHorizon = 36; // months

  // ── Initialization ────────────────────────────────────────
  function init() {
    Charts.init();
    MapView.init();

    // Initial data render
    refreshData();

    // Wire up event listeners
    wireEvents();

    // Animate KPI counters
    setTimeout(animateKPIs, 300);

    console.log("🏙️ Urban Growth Analytics Engine initialized");
  }

  // ── Event Wiring ──────────────────────────────────────────
  function wireEvents() {
    // City filter
    const citySelect = document.getElementById("city-filter");
    if (citySelect) {
      citySelect.addEventListener("change", (e) => {
        currentCity = e.target.value;
        MapView.flyTo(currentCity);
        refreshData();
        animateKPIs();
        // Close zone detail if open
        closeZoneDetail();
      });
    }

    // Time horizon slider
    const horizonSlider = document.getElementById("time-horizon");
    const horizonValue = document.getElementById("horizon-value");
    if (horizonSlider) {
      horizonSlider.addEventListener("input", (e) => {
        timeHorizon = parseInt(e.target.value);
        if (horizonValue) horizonValue.textContent = `${timeHorizon} months`;
        if (selectedZoneId) {
          renderProjections(selectedZoneId);
        }
      });
    }

    // Map mode toggle
    const modeBtn = document.getElementById("map-mode-toggle");
    if (modeBtn) {
      modeBtn.addEventListener("click", () => {
        const mode = MapView.toggleMode();
        modeBtn.textContent =
          mode === "heatmap" ? "🗺️ Markers" : "🔥 Heatmap";
        modeBtn.title =
          mode === "heatmap" ? "Switch to Marker View" : "Switch to Heatmap View";
      });
    }

    // Zone detail close
    const closeBtn = document.getElementById("close-zone-detail");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeZoneDetail);
    }
  }

  // ── Data Refresh ──────────────────────────────────────────
  function refreshData() {
    const city = currentCity === "All Cities" ? null : currentCity;
    const ranked = Engine.rankZones(city);

    // Update map
    MapView.updateHeatmap(ranked);
    MapView.updateMarkers(ranked, (zone) => {
      selectZone(zone.id);
    });

    // Update KPIs
    updateKPIs(city);

    // Update bottom charts
    Charts.renderTopZones(currentCity);
    Charts.renderScatter(currentCity);
  }

  // ── KPI Updates ───────────────────────────────────────────
  function updateKPIs(city) {
    const kpis = Engine.getKPIs(city);

    setKPI("kpi-zones", kpis.zoneCount);
    setKPI("kpi-gvs", kpis.avgGVS);
    setKPI("kpi-infra", kpis.totalDeclarations);
    setKPI("kpi-listings", kpis.totalListings.toLocaleString());
    setKPI("kpi-hot", kpis.hotZones);

    // Top zone highlight
    const topEl = document.getElementById("kpi-top-zone");
    if (topEl && kpis.topZone) {
      topEl.textContent = kpis.topZone.name;
      topEl.title = `GVS: ${kpis.topZone.gvs} — ${kpis.topZone.city}`;
    }
  }

  function setKPI(id, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute("data-target", value);
  }

  function animateKPIs() {
    document.querySelectorAll(".kpi-value").forEach((el) => {
      const target = el.getAttribute("data-target");
      if (!target) return;

      // Check if target contains comma (formatted number)
      const isFormatted = target.includes(",");
      const numTarget = isFormatted
        ? parseInt(target.replace(/,/g, ""))
        : parseInt(target);

      if (isNaN(numTarget)) {
        el.textContent = target;
        return;
      }

      let current = 0;
      const increment = Math.max(Math.ceil(numTarget / 40), 1);
      const timer = setInterval(() => {
        current += increment;
        if (current >= numTarget) {
          current = numTarget;
          clearInterval(timer);
        }
        el.textContent = isFormatted
          ? current.toLocaleString()
          : current;
      }, 30);
    });
  }

  // ── Zone Selection ────────────────────────────────────────
  function selectZone(zoneId) {
    selectedZoneId = zoneId;
    const zone = Engine.getZone(zoneId);
    const scores = Engine.computeGrowthVelocityScore(zoneId);
    const md = Engine.getLatestMarketData(zoneId);
    const declarations = Engine.getDeclarations(zoneId);

    if (!zone) return;

    // Show detail panel
    const panel = document.getElementById("zone-detail-panel");
    if (panel) {
      panel.classList.add("active");
    }

    // Update header
    const nameEl = document.getElementById("zone-detail-name");
    const metaEl = document.getElementById("zone-detail-meta");
    if (nameEl) nameEl.textContent = zone.name;
    if (metaEl)
      metaEl.textContent = `${zone.city} · ${zone.ward} · ${zone.landUse}`;

    // Update zone score badges
    const scoreEl = document.getElementById("zone-detail-scores");
    if (scoreEl) {
      scoreEl.innerHTML = `
        <div class="zone-score-badge tier-bg-${scores.tier.toLowerCase()}">
          <span class="badge-value">${scores.gvs}</span>
          <span class="badge-label">GVS</span>
        </div>
        <div class="zone-score-badge">
          <span class="badge-value" style="color: #00d4ff">${scores.infraScore}</span>
          <span class="badge-label">Infra</span>
        </div>
        <div class="zone-score-badge">
          <span class="badge-value" style="color: #ff9f43">${scores.momentum}</span>
          <span class="badge-label">Momentum</span>
        </div>
        <div class="zone-score-badge">
          <span class="badge-value" style="color: #00e676">${scores.underval}</span>
          <span class="badge-label">Underval</span>
        </div>
      `;
    }

    // Update market snapshot
    const snapEl = document.getElementById("zone-market-snapshot");
    if (snapEl && md) {
      snapEl.innerHTML = `
        <div class="snapshot-item">
          <span class="snap-label">Price/sqft</span>
          <span class="snap-value">₹${md.avgPriceSqft_sell.toLocaleString()}</span>
        </div>
        <div class="snapshot-item">
          <span class="snap-label">Rent/sqft</span>
          <span class="snap-value">₹${md.avgPriceSqft_rent}</span>
        </div>
        <div class="snapshot-item">
          <span class="snap-label">YoY Change</span>
          <span class="snap-value positive">+${md.yoyPriceChange_pct}%</span>
        </div>
        <div class="snapshot-item">
          <span class="snap-label">Rental Yield</span>
          <span class="snap-value">${md.rentalYield_pct}%</span>
        </div>
        <div class="snapshot-item">
          <span class="snap-label">Listings</span>
          <span class="snap-value">${md.listingCount}</span>
        </div>
        <div class="snapshot-item">
          <span class="snap-label">Absorption</span>
          <span class="snap-value">${md.absorptionRate_pct}%</span>
        </div>
      `;
    }

    // Update declarations list
    const declEl = document.getElementById("zone-declarations");
    if (declEl) {
      declEl.innerHTML = declarations
        .map(
          (d) => `
          <div class="declaration-card">
            <div class="decl-header">
              <span class="decl-type type-${d.type.toLowerCase()}">${d.type.replace(/_/g, " ")}</span>
              <span class="decl-status status-${d.status.toLowerCase()}">${d.status.replace(/_/g, " ")}</span>
            </div>
            <div class="decl-title">${d.title}</div>
            <div class="decl-meta">
              <span>₹${d.budgetCrores.toLocaleString()} Cr</span>
              <span>ETA: ${d.estimatedCompletion}</span>
              <span>${d.source}</span>
            </div>
          </div>
        `
        )
        .join("");
    }

    // Render charts
    Charts.renderPriceTrend(zoneId);
    Charts.renderGVSGauge(zoneId);
    Charts.renderPipeline(currentCity);

    // Render projections
    renderProjections(zoneId);
  }

  // ── Growth Projections ────────────────────────────────────
  function renderProjections(zoneId) {
    const projections = Engine.projectGrowth(zoneId, timeHorizon);
    const projEl = document.getElementById("zone-projections");
    if (!projEl || projections.length === 0) return;

    // Show select milestones
    const milestones = [];
    const step = Math.max(Math.floor(projections.length / 4), 1);
    for (let i = 0; i < projections.length; i += step) {
      milestones.push(projections[i]);
    }
    // Always include last
    if (milestones[milestones.length - 1] !== projections[projections.length - 1]) {
      milestones.push(projections[projections.length - 1]);
    }

    projEl.innerHTML = `
      <div class="projection-timeline">
        ${milestones
          .map(
            (p, i) => `
          <div class="projection-point" style="animation-delay: ${i * 0.1}s">
            <div class="proj-quarter">${p.quarter}</div>
            <div class="proj-gvs">${p.gvs}</div>
            <div class="proj-price">₹${p.estimatedPriceSqft.toLocaleString()}/sqft</div>
          </div>
        `
          )
          .join('<div class="proj-connector"></div>')}
      </div>
    `;
  }

  // ── Close Zone Detail ─────────────────────────────────────
  function closeZoneDetail() {
    selectedZoneId = null;
    const panel = document.getElementById("zone-detail-panel");
    if (panel) panel.classList.remove("active");
  }

  // ── Public API ──────────────────────────────────────────
  return {
    init,
    selectZone,
    closeZoneDetail,
  };
})();

// ── Boot ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", App.init);
