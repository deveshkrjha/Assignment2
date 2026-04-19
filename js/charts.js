// ============================================================
// Chart.js Visualizations
// ============================================================

const Charts = (() => {
  let priceTrendChart = null;
  let gvsGaugeChart = null;
  let topZonesChart = null;
  let scatterChart = null;
  let pipelineChart = null;

  // ── Color palette ─────────────────────────────────────────
  const COLORS = {
    cyan: "#00d4ff",
    cyanAlpha: "rgba(0, 212, 255, 0.2)",
    amber: "#ff9f43",
    amberAlpha: "rgba(255, 159, 67, 0.2)",
    emerald: "#00e676",
    red: "#ff4757",
    purple: "#a29bfe",
    pink: "#fd79a8",
    blue: "#74b9ff",
    gridColor: "rgba(255, 255, 255, 0.06)",
    textColor: "rgba(255, 255, 255, 0.7)",
    textColorBright: "rgba(255, 255, 255, 0.9)",
  };

  const TIER_COLORS_MAP = {
    HOT: "#ff4757",
    WARM: "#ff9f43",
    EMERGING: "#00e676",
    STABLE: "#74b9ff",
  };

  // ── Chart defaults ────────────────────────────────────────
  function setDefaults() {
    Chart.defaults.color = COLORS.textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 16;
  }

  // ── Price Trend (Line Chart) ──────────────────────────────
  function renderPriceTrend(zoneId) {
    const history = Engine.getMarketHistory(zoneId);
    if (history.length === 0) return;

    const ctx = document.getElementById("chart-price-trend");
    if (!ctx) return;

    if (priceTrendChart) priceTrendChart.destroy();

    priceTrendChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: history.map((d) => d.period),
        datasets: [
          {
            label: "Selling Price (₹/sqft)",
            data: history.map((d) => d.avgPriceSqft_sell),
            borderColor: COLORS.cyan,
            backgroundColor: COLORS.cyanAlpha,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: COLORS.cyan,
            pointBorderColor: "#0a0e17",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: "Rent (₹/sqft/mo)",
            data: history.map((d) => d.avgPriceSqft_rent),
            borderColor: COLORS.amber,
            backgroundColor: COLORS.amberAlpha,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: COLORS.amber,
            pointBorderColor: "#0a0e17",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { position: "top" },
          tooltip: {
            backgroundColor: "rgba(10, 14, 23, 0.95)",
            borderColor: COLORS.cyan,
            borderWidth: 1,
            padding: 12,
            titleFont: { weight: "bold" },
          },
        },
        scales: {
          x: {
            grid: { color: COLORS.gridColor },
            ticks: { color: COLORS.textColor },
          },
          y: {
            position: "left",
            grid: { color: COLORS.gridColor },
            ticks: {
              color: COLORS.textColor,
              callback: (v) => "₹" + v.toLocaleString(),
            },
            title: {
              display: true,
              text: "Selling Price (₹/sqft)",
              color: COLORS.cyan,
            },
          },
          y1: {
            position: "right",
            grid: { display: false },
            ticks: {
              color: COLORS.textColor,
              callback: (v) => "₹" + v,
            },
            title: {
              display: true,
              text: "Rent (₹/sqft/mo)",
              color: COLORS.amber,
            },
          },
        },
      },
    });
  }

  // ── GVS Gauge (Doughnut) ──────────────────────────────────
  function renderGVSGauge(zoneId) {
    const scores = Engine.computeGrowthVelocityScore(zoneId);
    const ctx = document.getElementById("chart-gvs-gauge");
    if (!ctx) return;

    if (gvsGaugeChart) gvsGaugeChart.destroy();

    const tierColor = TIER_COLORS_MAP[scores.tier] || COLORS.blue;

    gvsGaugeChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Infrastructure", "Momentum", "Undervaluation", "Remaining"],
        datasets: [
          {
            data: [
              scores.infraScore * Engine.WEIGHTS.infrastructure,
              scores.momentum * Engine.WEIGHTS.marketMomentum,
              scores.underval * Engine.WEIGHTS.undervaluation,
              Math.max(100 - scores.gvs, 0),
            ],
            backgroundColor: [
              COLORS.cyan,
              COLORS.amber,
              COLORS.emerald,
              "rgba(255, 255, 255, 0.05)",
            ],
            borderColor: "#0a0e17",
            borderWidth: 3,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { padding: 12, font: { size: 11 } },
          },
          tooltip: {
            backgroundColor: "rgba(10, 14, 23, 0.95)",
            borderColor: tierColor,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${Math.round(ctx.raw)}`,
            },
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          afterDraw: (chart) => {
            const { ctx: c, width, height } = chart;
            c.save();
            c.font = `bold 36px 'Inter', sans-serif`;
            c.fillStyle = tierColor;
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText(scores.gvs, width / 2, height / 2 - 10);

            c.font = `600 13px 'Inter', sans-serif`;
            c.fillStyle = COLORS.textColor;
            c.fillText(scores.tier, width / 2, height / 2 + 18);
            c.restore();
          },
        },
      ],
    });
  }

  // ── Top Zones Bar Chart ───────────────────────────────────
  function renderTopZones(city) {
    const ranked = Engine.rankZones(city === "All Cities" ? null : city);
    const top10 = ranked.slice(0, 10);

    const ctx = document.getElementById("chart-top-zones");
    if (!ctx) return;

    if (topZonesChart) topZonesChart.destroy();

    topZonesChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top10.map((z) => z.name),
        datasets: [
          {
            label: "Infrastructure",
            data: top10.map(
              (z) => z.infraScore * Engine.WEIGHTS.infrastructure
            ),
            backgroundColor: COLORS.cyan + "cc",
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: "Momentum",
            data: top10.map(
              (z) => z.momentum * Engine.WEIGHTS.marketMomentum
            ),
            backgroundColor: COLORS.amber + "cc",
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: "Undervaluation",
            data: top10.map(
              (z) => z.underval * Engine.WEIGHTS.undervaluation
            ),
            backgroundColor: COLORS.emerald + "cc",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { position: "top" },
          tooltip: {
            backgroundColor: "rgba(10, 14, 23, 0.95)",
            borderColor: COLORS.cyan,
            borderWidth: 1,
            padding: 12,
            callbacks: {
              afterBody: (items) => {
                const zone = top10[items[0].dataIndex];
                return `\nTotal GVS: ${zone.gvs} (${zone.tier})`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { color: COLORS.gridColor },
            ticks: { color: COLORS.textColor },
            max: 100,
            title: {
              display: true,
              text: "Growth Velocity Score",
              color: COLORS.textColor,
            },
          },
          y: {
            stacked: true,
            grid: { display: false },
            ticks: {
              color: COLORS.textColorBright,
              font: { weight: "600" },
            },
          },
        },
      },
    });
  }

  // ── Rental Yield vs Selling Price Scatter ──────────────────
  function renderScatter(city) {
    const data = Engine.getScatterData(city === "All Cities" ? null : city);
    const ctx = document.getElementById("chart-scatter");
    if (!ctx) return;

    if (scatterChart) scatterChart.destroy();

    scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "HOT Zones",
            data: data.filter((d) => d.tier === "HOT"),
            backgroundColor: TIER_COLORS_MAP.HOT + "cc",
            borderColor: TIER_COLORS_MAP.HOT,
            pointRadius: 8,
            pointHoverRadius: 12,
          },
          {
            label: "WARM Zones",
            data: data.filter((d) => d.tier === "WARM"),
            backgroundColor: TIER_COLORS_MAP.WARM + "cc",
            borderColor: TIER_COLORS_MAP.WARM,
            pointRadius: 8,
            pointHoverRadius: 12,
          },
          {
            label: "EMERGING Zones",
            data: data.filter((d) => d.tier === "EMERGING"),
            backgroundColor: TIER_COLORS_MAP.EMERGING + "cc",
            borderColor: TIER_COLORS_MAP.EMERGING,
            pointRadius: 8,
            pointHoverRadius: 12,
          },
          {
            label: "STABLE Zones",
            data: data.filter((d) => d.tier === "STABLE"),
            backgroundColor: TIER_COLORS_MAP.STABLE + "cc",
            borderColor: TIER_COLORS_MAP.STABLE,
            pointRadius: 8,
            pointHoverRadius: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          tooltip: {
            backgroundColor: "rgba(10, 14, 23, 0.95)",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: (items) => {
                const d = items[0].raw;
                return `${d.label} (${d.city})`;
              },
              label: (item) => {
                const d = item.raw;
                return [
                  `Price: ₹${d.x.toLocaleString()}/sqft`,
                  `Rental Yield: ${d.y}%`,
                  `GVS: ${d.gvs}`,
                ];
              },
            },
          },
          // Annotation-like labels
        },
        scales: {
          x: {
            grid: { color: COLORS.gridColor },
            ticks: {
              color: COLORS.textColor,
              callback: (v) => "₹" + (v / 1000).toFixed(0) + "K",
            },
            title: {
              display: true,
              text: "Selling Price (₹/sqft)",
              color: COLORS.textColor,
            },
          },
          y: {
            grid: { color: COLORS.gridColor },
            ticks: {
              color: COLORS.textColor,
              callback: (v) => v + "%",
            },
            title: {
              display: true,
              text: "Rental Yield (%)",
              color: COLORS.textColor,
            },
          },
        },
      },
    });
  }

  // ── Municipal Pipeline Stacked Bar ────────────────────────
  function renderPipeline(city) {
    const data = Engine.getDeclarationsPipeline(
      city === "All Cities" ? null : city
    );
    const ctx = document.getElementById("chart-pipeline");
    if (!ctx) return;

    if (pipelineChart) pipelineChart.destroy();

    const statusColors = {
      ANNOUNCED: COLORS.purple,
      APPROVED: COLORS.cyan,
      UNDER_CONSTRUCTION: COLORS.amber,
      COMPLETED: COLORS.emerald,
    };

    // Friendly labels
    const typeLabels = {
      METRO_LINE: "Metro",
      EXPRESSWAY: "Expressway",
      AIRPORT: "Airport",
      IT_PARK_SEZ: "IT/SEZ",
      FLYOVER: "Flyover",
      ROAD_WIDENING: "Road",
      SEWAGE_WATER: "Utilities",
      ZONING_CHANGE: "Zoning",
    };

    pipelineChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.types.map((t) => typeLabels[t] || t),
        datasets: data.statuses.map((status) => ({
          label: status.replace(/_/g, " "),
          data: data.types.map((type) => data.pipeline[type][status]),
          backgroundColor: statusColors[status] + "cc",
          borderRadius: 3,
          borderSkipped: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { font: { size: 10 } } },
          tooltip: {
            backgroundColor: "rgba(10, 14, 23, 0.95)",
            borderWidth: 1,
            padding: 10,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: COLORS.textColor, font: { size: 10 } },
          },
          y: {
            stacked: true,
            grid: { color: COLORS.gridColor },
            ticks: {
              color: COLORS.textColor,
              stepSize: 1,
            },
            title: {
              display: true,
              text: "Count",
              color: COLORS.textColor,
            },
          },
        },
      },
    });
  }

  function init() {
    setDefaults();
  }

  return {
    init,
    renderPriceTrend,
    renderGVSGauge,
    renderTopZones,
    renderScatter,
    renderPipeline,
  };
})();
