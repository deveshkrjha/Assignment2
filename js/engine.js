// ============================================================
// Growth Velocity Score (GVS) Computation Engine
// ============================================================

const Engine = (() => {
  // ── Weight Configuration ──────────────────────────────────
  const WEIGHTS = {
    infrastructure: 0.40,
    marketMomentum: 0.35,
    undervaluation: 0.25,
  };

  // Base weights by infrastructure declaration type
  const INFRA_TYPE_WEIGHTS = {
    METRO_LINE: 25,
    EXPRESSWAY: 20,
    AIRPORT: 22,
    IT_PARK_SEZ: 18,
    FLYOVER: 12,
    ROAD_WIDENING: 10,
    SEWAGE_WATER: 8,
    ZONING_CHANGE: 15,
  };

  // Status multipliers
  const STATUS_MULTIPLIER = {
    ANNOUNCED: 0.6,
    APPROVED: 1.0,
    UNDER_CONSTRUCTION: 1.3,
    COMPLETED: 0.3,
  };

  // ── Helper: Get latest market data for a zone ─────────────
  function getLatestMarketData(zoneId) {
    const zoneData = MARKET_DATA.filter((d) => d.zoneId === zoneId);
    if (zoneData.length === 0) return null;
    return zoneData.sort((a, b) => b.period.localeCompare(a.period))[0];
  }

  // ── Helper: Get all market data for a zone (sorted) ───────
  function getMarketHistory(zoneId) {
    return MARKET_DATA.filter((d) => d.zoneId === zoneId).sort((a, b) =>
      a.period.localeCompare(b.period)
    );
  }

  // ── Helper: Get zone info ─────────────────────────────────
  function getZone(zoneId) {
    return ZONES.find((z) => z.id === zoneId);
  }

  // ── Helper: Get declarations for a zone ───────────────────
  function getDeclarations(zoneId) {
    return MUNICIPAL_DECLARATIONS.filter((d) => d.zoneId === zoneId);
  }

  // ── Helper: City average rental yield ─────────────────────
  function getCityAvgRentalYield(city) {
    const cityZones = ZONES.filter((z) => z.city === city);
    let totalYield = 0;
    let count = 0;
    cityZones.forEach((z) => {
      const md = getLatestMarketData(z.id);
      if (md) {
        totalYield += md.rentalYield_pct;
        count++;
      }
    });
    return count > 0 ? totalYield / count : 3.0;
  }

  // ── Helper: City average price/sqft ───────────────────────
  function getCityAvgPrice(city) {
    const cityZones = ZONES.filter((z) => z.city === city);
    let totalPrice = 0;
    let count = 0;
    cityZones.forEach((z) => {
      const md = getLatestMarketData(z.id);
      if (md) {
        totalPrice += md.avgPriceSqft_sell;
        count++;
      }
    });
    return count > 0 ? totalPrice / count : 7000;
  }

  // ── Helper: Get neighboring zones' avg price ──────────────
  function getNeighborAvgPrice(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return 7000;

    const cityZones = ZONES.filter(
      (z) => z.city === zone.city && z.id !== zoneId
    );
    let totalPrice = 0;
    let count = 0;
    cityZones.forEach((z) => {
      const md = getLatestMarketData(z.id);
      if (md) {
        totalPrice += md.avgPriceSqft_sell;
        count++;
      }
    });
    return count > 0 ? totalPrice / count : 7000;
  }

  // ════════════════════════════════════════════════════════════
  // CORE SCORING FUNCTIONS
  // ════════════════════════════════════════════════════════════

  /**
   * Infrastructure Score (0–100)
   * Weights municipal declarations by type, budget, and status
   */
  function computeInfrastructureScore(zoneId) {
    const declarations = getDeclarations(zoneId);
    if (declarations.length === 0) return 0;

    let rawScore = 0;
    declarations.forEach((decl) => {
      const typeWeight = INFRA_TYPE_WEIGHTS[decl.type] || 10;
      const statusMult = STATUS_MULTIPLIER[decl.status] || 0.5;
      const budgetFactor = Math.min(
        Math.log10(Math.max(decl.budgetCrores, 1)) / 5,
        1.0
      );

      rawScore += typeWeight * statusMult * (0.5 + budgetFactor * 0.5);
    });

    // Normalize to 0–100 (cap at roughly 80 raw points for max)
    return Math.min(Math.round((rawScore / 60) * 100), 100);
  }

  /**
   * Market Momentum Score (0–100)
   * Normalized from YoY price change, listing density, search volume, absorption rate
   */
  function computeMarketMomentum(zoneId) {
    const md = getLatestMarketData(zoneId);
    const zone = getZone(zoneId);
    if (!md || !zone) return 0;

    // YoY Price Change — normalized 0–30 (30% = max score)
    const priceScore = Math.min((md.yoyPriceChange_pct / 30) * 30, 30);

    // Listing Density per sqkm — normalized 0–20
    const density = md.listingCount / zone.area_sqkm;
    const densityScore = Math.min((density / 50) * 20, 20);

    // Search Volume Index — normalized 0–25
    const searchScore = Math.min((md.searchVolume / 30000) * 25, 25);

    // Absorption Rate — normalized 0–25
    const absorptionScore = Math.min(
      ((md.absorptionRate_pct - 40) / 40) * 25,
      25
    );

    return Math.round(
      Math.max(priceScore + densityScore + searchScore + absorptionScore, 0)
    );
  }

  /**
   * Undervaluation Index (0–100)
   * Compares rental yield and price against city averages
   */
  function computeUndervaluationIndex(zoneId) {
    const md = getLatestMarketData(zoneId);
    const zone = getZone(zoneId);
    if (!md || !zone) return 50;

    const cityAvgYield = getCityAvgRentalYield(zone.city);
    const neighborAvgPrice = getNeighborAvgPrice(zoneId);

    // Higher yield = more undervalued
    const yieldComponent =
      (md.rentalYield_pct / cityAvgYield - 1) * 50 + 50;

    // Lower price vs neighbors = more undervalued
    const priceComponent =
      (1 - md.avgPriceSqft_sell / neighborAvgPrice) * 50 + 50;

    const raw = yieldComponent * 0.5 + priceComponent * 0.5;
    return Math.round(Math.max(Math.min(raw, 100), 0));
  }

  /**
   * Growth Velocity Score — Weighted composite
   */
  function computeGrowthVelocityScore(zoneId) {
    const infraScore = computeInfrastructureScore(zoneId);
    const momentum = computeMarketMomentum(zoneId);
    const underval = computeUndervaluationIndex(zoneId);

    const gvs = Math.round(
      WEIGHTS.infrastructure * infraScore +
        WEIGHTS.marketMomentum * momentum +
        WEIGHTS.undervaluation * underval
    );

    return {
      gvs,
      infraScore,
      momentum,
      underval,
      tier:
        gvs >= 70 ? "HOT" : gvs >= 50 ? "WARM" : gvs >= 30 ? "EMERGING" : "STABLE",
    };
  }

  /**
   * Project Growth forward (simple trend extrapolation)
   * Returns projected GVS array for future quarters
   */
  function projectGrowth(zoneId, months) {
    const history = getMarketHistory(zoneId);
    if (history.length < 2) return [];

    const current = computeGrowthVelocityScore(zoneId);
    const quarters = Math.ceil(months / 3);

    // Calculate trend from price history
    const firstPrice = history[0].avgPriceSqft_sell;
    const lastPrice = history[history.length - 1].avgPriceSqft_sell;
    const quarterlyGrowthRate =
      (lastPrice / firstPrice - 1) / (history.length - 1);

    const projections = [];
    for (let q = 1; q <= quarters; q++) {
      // GVS tends to grow with infrastructure completion, then stabilize
      const infraBoost = q <= 8 ? q * 1.5 : 12;
      const momentum = quarterlyGrowthRate * 100 * q;
      const projectedGVS = Math.min(
        Math.round(current.gvs + infraBoost + momentum),
        100
      );

      projections.push({
        quarter: `Q${((q - 1) % 4) + 1} ${2026 + Math.floor((q - 1 + 0) / 4)}`,
        gvs: projectedGVS,
        estimatedPriceSqft: Math.round(
          lastPrice * Math.pow(1 + quarterlyGrowthRate, q)
        ),
      });
    }

    return projections;
  }

  /**
   * Rank all zones by GVS, optionally filtering by city
   */
  function rankZones(city) {
    let zones = city ? ZONES.filter((z) => z.city === city) : [...ZONES];

    return zones
      .map((z) => {
        const scores = computeGrowthVelocityScore(z.id);
        const md = getLatestMarketData(z.id);
        const declarations = getDeclarations(z.id);
        return {
          ...z,
          ...scores,
          latestMarket: md,
          declarationCount: declarations.length,
          declarations,
        };
      })
      .sort((a, b) => b.gvs - a.gvs);
  }

  /**
   * Get aggregate KPIs for a city or all cities
   */
  function getKPIs(city) {
    const ranked = rankZones(city);
    const totalDeclarations = ranked.reduce(
      (sum, z) => sum + z.declarationCount,
      0
    );
    const avgGVS =
      ranked.reduce((sum, z) => sum + z.gvs, 0) / ranked.length || 0;
    const totalListings = ranked.reduce(
      (sum, z) => sum + (z.latestMarket?.listingCount || 0),
      0
    );
    const hotZones = ranked.filter((z) => z.tier === "HOT").length;

    return {
      zoneCount: ranked.length,
      avgGVS: Math.round(avgGVS),
      totalDeclarations,
      totalListings,
      hotZones,
      topZone: ranked[0],
    };
  }

  /**
   * Get data for scatter plot (rental yield vs selling price)
   */
  function getScatterData(city) {
    const ranked = rankZones(city);
    return ranked.map((z) => ({
      x: z.latestMarket?.avgPriceSqft_sell || 0,
      y: z.latestMarket?.rentalYield_pct || 0,
      label: z.name,
      city: z.city,
      gvs: z.gvs,
      tier: z.tier,
    }));
  }

  /**
   * Get declarations grouped by type and status for a city
   */
  function getDeclarationsPipeline(city) {
    let decls = city
      ? MUNICIPAL_DECLARATIONS.filter((d) => {
          const zone = getZone(d.zoneId);
          return zone && zone.city === city;
        })
      : [...MUNICIPAL_DECLARATIONS];

    const types = [
      ...new Set(decls.map((d) => d.type)),
    ];
    const statuses = ["ANNOUNCED", "APPROVED", "UNDER_CONSTRUCTION", "COMPLETED"];

    const pipeline = {};
    types.forEach((type) => {
      pipeline[type] = {};
      statuses.forEach((status) => {
        pipeline[type][status] = decls.filter(
          (d) => d.type === type && d.status === status
        ).length;
      });
    });

    return { types, statuses, pipeline };
  }

  // ── Public API ──────────────────────────────────────────
  return {
    computeInfrastructureScore,
    computeMarketMomentum,
    computeUndervaluationIndex,
    computeGrowthVelocityScore,
    projectGrowth,
    rankZones,
    getKPIs,
    getLatestMarketData,
    getMarketHistory,
    getDeclarations,
    getScatterData,
    getDeclarationsPipeline,
    getZone,
    WEIGHTS,
  };
})();
