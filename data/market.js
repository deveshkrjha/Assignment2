// ============================================================
// Market Listing Data — Quarterly Snapshots
// 5 quarters (Q1-2025 → Q1-2026) for each of 30 zones
// ============================================================
const MARKET_DATA = [
  // ── PUNE — Wakad ────────────────────────────────────────
  { zoneId:"PUN-WAK-01", period:"2025-Q1", avgPriceSqft_sell:6800, avgPriceSqft_rent:18, listingCount:280, searchVolume:14200, readyToMove_pct:50, underConstruction_pct:50, yoyPriceChange_pct:8.2, rentalYield_pct:3.2, absorptionRate_pct:62 },
  { zoneId:"PUN-WAK-01", period:"2025-Q2", avgPriceSqft_sell:7050, avgPriceSqft_rent:19, listingCount:305, searchVolume:15800, readyToMove_pct:48, underConstruction_pct:52, yoyPriceChange_pct:9.5, rentalYield_pct:3.2, absorptionRate_pct:65 },
  { zoneId:"PUN-WAK-01", period:"2025-Q3", avgPriceSqft_sell:7300, avgPriceSqft_rent:20, listingCount:318, searchVolume:16500, readyToMove_pct:46, underConstruction_pct:54, yoyPriceChange_pct:10.8, rentalYield_pct:3.3, absorptionRate_pct:67 },
  { zoneId:"PUN-WAK-01", period:"2025-Q4", avgPriceSqft_sell:7550, avgPriceSqft_rent:21, listingCount:330, searchVolume:17800, readyToMove_pct:44, underConstruction_pct:56, yoyPriceChange_pct:11.5, rentalYield_pct:3.3, absorptionRate_pct:68 },
  { zoneId:"PUN-WAK-01", period:"2026-Q1", avgPriceSqft_sell:7850, avgPriceSqft_rent:22, listingCount:342, searchVolume:18500, readyToMove_pct:45, underConstruction_pct:55, yoyPriceChange_pct:12.3, rentalYield_pct:3.4, absorptionRate_pct:70 },

  // ── PUNE — Hinjewadi ────────────────────────────────────
  { zoneId:"PUN-HIN-02", period:"2025-Q1", avgPriceSqft_sell:6200, avgPriceSqft_rent:16, listingCount:420, searchVolume:22000, readyToMove_pct:40, underConstruction_pct:60, yoyPriceChange_pct:7.5, rentalYield_pct:3.1, absorptionRate_pct:58 },
  { zoneId:"PUN-HIN-02", period:"2025-Q2", avgPriceSqft_sell:6450, avgPriceSqft_rent:17, listingCount:440, searchVolume:23500, readyToMove_pct:38, underConstruction_pct:62, yoyPriceChange_pct:8.8, rentalYield_pct:3.2, absorptionRate_pct:60 },
  { zoneId:"PUN-HIN-02", period:"2025-Q3", avgPriceSqft_sell:6700, avgPriceSqft_rent:17, listingCount:455, searchVolume:24200, readyToMove_pct:37, underConstruction_pct:63, yoyPriceChange_pct:10.2, rentalYield_pct:3.1, absorptionRate_pct:62 },
  { zoneId:"PUN-HIN-02", period:"2025-Q4", avgPriceSqft_sell:6950, avgPriceSqft_rent:18, listingCount:470, searchVolume:25800, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:11.5, rentalYield_pct:3.1, absorptionRate_pct:64 },
  { zoneId:"PUN-HIN-02", period:"2026-Q1", avgPriceSqft_sell:7250, avgPriceSqft_rent:19, listingCount:485, searchVolume:27000, readyToMove_pct:36, underConstruction_pct:64, yoyPriceChange_pct:13.1, rentalYield_pct:3.1, absorptionRate_pct:66 },

  // ── PUNE — Balewadi ─────────────────────────────────────
  { zoneId:"PUN-BAL-03", period:"2025-Q1", avgPriceSqft_sell:8500, avgPriceSqft_rent:24, listingCount:180, searchVolume:10500, readyToMove_pct:55, underConstruction_pct:45, yoyPriceChange_pct:6.0, rentalYield_pct:3.4, absorptionRate_pct:70 },
  { zoneId:"PUN-BAL-03", period:"2025-Q2", avgPriceSqft_sell:8650, avgPriceSqft_rent:24, listingCount:185, searchVolume:10800, readyToMove_pct:56, underConstruction_pct:44, yoyPriceChange_pct:5.5, rentalYield_pct:3.3, absorptionRate_pct:71 },
  { zoneId:"PUN-BAL-03", period:"2025-Q3", avgPriceSqft_sell:8800, avgPriceSqft_rent:25, listingCount:190, searchVolume:11200, readyToMove_pct:57, underConstruction_pct:43, yoyPriceChange_pct:5.2, rentalYield_pct:3.4, absorptionRate_pct:72 },
  { zoneId:"PUN-BAL-03", period:"2025-Q4", avgPriceSqft_sell:8950, avgPriceSqft_rent:25, listingCount:188, searchVolume:11000, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:5.0, rentalYield_pct:3.4, absorptionRate_pct:73 },
  { zoneId:"PUN-BAL-03", period:"2026-Q1", avgPriceSqft_sell:9100, avgPriceSqft_rent:26, listingCount:192, searchVolume:11500, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:5.3, rentalYield_pct:3.4, absorptionRate_pct:74 },

  // ── PUNE — Kharadi ──────────────────────────────────────
  { zoneId:"PUN-KHA-04", period:"2025-Q1", avgPriceSqft_sell:7200, avgPriceSqft_rent:20, listingCount:310, searchVolume:16000, readyToMove_pct:48, underConstruction_pct:52, yoyPriceChange_pct:9.0, rentalYield_pct:3.3, absorptionRate_pct:64 },
  { zoneId:"PUN-KHA-04", period:"2025-Q2", avgPriceSqft_sell:7450, avgPriceSqft_rent:21, listingCount:325, searchVolume:16800, readyToMove_pct:47, underConstruction_pct:53, yoyPriceChange_pct:9.8, rentalYield_pct:3.4, absorptionRate_pct:65 },
  { zoneId:"PUN-KHA-04", period:"2025-Q3", avgPriceSqft_sell:7700, avgPriceSqft_rent:21, listingCount:335, searchVolume:17200, readyToMove_pct:46, underConstruction_pct:54, yoyPriceChange_pct:10.5, rentalYield_pct:3.3, absorptionRate_pct:67 },
  { zoneId:"PUN-KHA-04", period:"2025-Q4", avgPriceSqft_sell:7950, avgPriceSqft_rent:22, listingCount:340, searchVolume:17900, readyToMove_pct:45, underConstruction_pct:55, yoyPriceChange_pct:11.2, rentalYield_pct:3.3, absorptionRate_pct:68 },
  { zoneId:"PUN-KHA-04", period:"2026-Q1", avgPriceSqft_sell:8200, avgPriceSqft_rent:23, listingCount:350, searchVolume:18600, readyToMove_pct:44, underConstruction_pct:56, yoyPriceChange_pct:12.0, rentalYield_pct:3.4, absorptionRate_pct:70 },

  // ── PUNE — Manjri ───────────────────────────────────────
  { zoneId:"PUN-MAN-05", period:"2025-Q1", avgPriceSqft_sell:4200, avgPriceSqft_rent:10, listingCount:150, searchVolume:6500, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:14.0, rentalYield_pct:2.9, absorptionRate_pct:55 },
  { zoneId:"PUN-MAN-05", period:"2025-Q2", avgPriceSqft_sell:4500, avgPriceSqft_rent:11, listingCount:168, searchVolume:7200, readyToMove_pct:33, underConstruction_pct:67, yoyPriceChange_pct:15.5, rentalYield_pct:2.9, absorptionRate_pct:56 },
  { zoneId:"PUN-MAN-05", period:"2025-Q3", avgPriceSqft_sell:4800, avgPriceSqft_rent:11, listingCount:180, searchVolume:8000, readyToMove_pct:32, underConstruction_pct:68, yoyPriceChange_pct:16.8, rentalYield_pct:2.8, absorptionRate_pct:57 },
  { zoneId:"PUN-MAN-05", period:"2025-Q4", avgPriceSqft_sell:5100, avgPriceSqft_rent:12, listingCount:195, searchVolume:8800, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:18.0, rentalYield_pct:2.8, absorptionRate_pct:58 },
  { zoneId:"PUN-MAN-05", period:"2026-Q1", avgPriceSqft_sell:5450, avgPriceSqft_rent:13, listingCount:210, searchVolume:9500, readyToMove_pct:31, underConstruction_pct:69, yoyPriceChange_pct:19.5, rentalYield_pct:2.9, absorptionRate_pct:60 },

  // ── BENGALURU — Whitefield ──────────────────────────────
  { zoneId:"BLR-WHF-01", period:"2025-Q1", avgPriceSqft_sell:7500, avgPriceSqft_rent:22, listingCount:480, searchVolume:28000, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:7.0, rentalYield_pct:3.5, absorptionRate_pct:72 },
  { zoneId:"BLR-WHF-01", period:"2025-Q2", avgPriceSqft_sell:7700, avgPriceSqft_rent:23, listingCount:490, searchVolume:28500, readyToMove_pct:53, underConstruction_pct:47, yoyPriceChange_pct:7.5, rentalYield_pct:3.6, absorptionRate_pct:73 },
  { zoneId:"BLR-WHF-01", period:"2025-Q3", avgPriceSqft_sell:7900, avgPriceSqft_rent:23, listingCount:500, searchVolume:29200, readyToMove_pct:54, underConstruction_pct:46, yoyPriceChange_pct:7.8, rentalYield_pct:3.5, absorptionRate_pct:74 },
  { zoneId:"BLR-WHF-01", period:"2025-Q4", avgPriceSqft_sell:8100, avgPriceSqft_rent:24, listingCount:510, searchVolume:30000, readyToMove_pct:55, underConstruction_pct:45, yoyPriceChange_pct:8.0, rentalYield_pct:3.6, absorptionRate_pct:75 },
  { zoneId:"BLR-WHF-01", period:"2026-Q1", avgPriceSqft_sell:8350, avgPriceSqft_rent:25, listingCount:520, searchVolume:31000, readyToMove_pct:55, underConstruction_pct:45, yoyPriceChange_pct:8.5, rentalYield_pct:3.6, absorptionRate_pct:76 },

  // ── BENGALURU — Sarjapur Road ───────────────────────────
  { zoneId:"BLR-SRP-02", period:"2025-Q1", avgPriceSqft_sell:6500, avgPriceSqft_rent:18, listingCount:380, searchVolume:20000, readyToMove_pct:42, underConstruction_pct:58, yoyPriceChange_pct:10.0, rentalYield_pct:3.3, absorptionRate_pct:60 },
  { zoneId:"BLR-SRP-02", period:"2025-Q2", avgPriceSqft_sell:6800, avgPriceSqft_rent:19, listingCount:400, searchVolume:21500, readyToMove_pct:41, underConstruction_pct:59, yoyPriceChange_pct:11.2, rentalYield_pct:3.4, absorptionRate_pct:62 },
  { zoneId:"BLR-SRP-02", period:"2025-Q3", avgPriceSqft_sell:7100, avgPriceSqft_rent:19, listingCount:415, searchVolume:22800, readyToMove_pct:40, underConstruction_pct:60, yoyPriceChange_pct:12.5, rentalYield_pct:3.2, absorptionRate_pct:63 },
  { zoneId:"BLR-SRP-02", period:"2025-Q4", avgPriceSqft_sell:7400, avgPriceSqft_rent:20, listingCount:430, searchVolume:24000, readyToMove_pct:39, underConstruction_pct:61, yoyPriceChange_pct:13.8, rentalYield_pct:3.2, absorptionRate_pct:65 },
  { zoneId:"BLR-SRP-02", period:"2026-Q1", avgPriceSqft_sell:7750, avgPriceSqft_rent:21, listingCount:445, searchVolume:25500, readyToMove_pct:40, underConstruction_pct:60, yoyPriceChange_pct:15.0, rentalYield_pct:3.3, absorptionRate_pct:67 },

  // ── BENGALURU — Electronic City ─────────────────────────
  { zoneId:"BLR-ELC-03", period:"2025-Q1", avgPriceSqft_sell:5800, avgPriceSqft_rent:15, listingCount:350, searchVolume:18000, readyToMove_pct:55, underConstruction_pct:45, yoyPriceChange_pct:6.5, rentalYield_pct:3.1, absorptionRate_pct:68 },
  { zoneId:"BLR-ELC-03", period:"2025-Q2", avgPriceSqft_sell:5950, avgPriceSqft_rent:15, listingCount:360, searchVolume:18500, readyToMove_pct:56, underConstruction_pct:44, yoyPriceChange_pct:6.8, rentalYield_pct:3.0, absorptionRate_pct:69 },
  { zoneId:"BLR-ELC-03", period:"2025-Q3", avgPriceSqft_sell:6100, avgPriceSqft_rent:16, listingCount:365, searchVolume:19000, readyToMove_pct:57, underConstruction_pct:43, yoyPriceChange_pct:7.0, rentalYield_pct:3.1, absorptionRate_pct:70 },
  { zoneId:"BLR-ELC-03", period:"2025-Q4", avgPriceSqft_sell:6250, avgPriceSqft_rent:16, listingCount:370, searchVolume:19500, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:7.2, rentalYield_pct:3.1, absorptionRate_pct:71 },
  { zoneId:"BLR-ELC-03", period:"2026-Q1", avgPriceSqft_sell:6400, avgPriceSqft_rent:17, listingCount:375, searchVolume:20000, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:7.5, rentalYield_pct:3.2, absorptionRate_pct:72 },

  // ── BENGALURU — Hebbal ──────────────────────────────────
  { zoneId:"BLR-HBR-04", period:"2025-Q1", avgPriceSqft_sell:9200, avgPriceSqft_rent:28, listingCount:220, searchVolume:14000, readyToMove_pct:60, underConstruction_pct:40, yoyPriceChange_pct:5.5, rentalYield_pct:3.6, absorptionRate_pct:75 },
  { zoneId:"BLR-HBR-04", period:"2025-Q2", avgPriceSqft_sell:9350, avgPriceSqft_rent:28, listingCount:225, searchVolume:14200, readyToMove_pct:61, underConstruction_pct:39, yoyPriceChange_pct:5.2, rentalYield_pct:3.6, absorptionRate_pct:76 },
  { zoneId:"BLR-HBR-04", period:"2025-Q3", avgPriceSqft_sell:9500, avgPriceSqft_rent:29, listingCount:228, searchVolume:14500, readyToMove_pct:62, underConstruction_pct:38, yoyPriceChange_pct:5.0, rentalYield_pct:3.7, absorptionRate_pct:76 },
  { zoneId:"BLR-HBR-04", period:"2025-Q4", avgPriceSqft_sell:9650, avgPriceSqft_rent:29, listingCount:230, searchVolume:14800, readyToMove_pct:63, underConstruction_pct:37, yoyPriceChange_pct:4.8, rentalYield_pct:3.6, absorptionRate_pct:77 },
  { zoneId:"BLR-HBR-04", period:"2026-Q1", avgPriceSqft_sell:9800, avgPriceSqft_rent:30, listingCount:232, searchVolume:15000, readyToMove_pct:63, underConstruction_pct:37, yoyPriceChange_pct:5.0, rentalYield_pct:3.7, absorptionRate_pct:78 },

  // ── BENGALURU — Devanahalli ─────────────────────────────
  { zoneId:"BLR-DEV-05", period:"2025-Q1", avgPriceSqft_sell:4500, avgPriceSqft_rent:10, listingCount:180, searchVolume:12000, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:18.0, rentalYield_pct:2.7, absorptionRate_pct:50 },
  { zoneId:"BLR-DEV-05", period:"2025-Q2", avgPriceSqft_sell:4900, avgPriceSqft_rent:11, listingCount:200, searchVolume:13500, readyToMove_pct:28, underConstruction_pct:72, yoyPriceChange_pct:20.5, rentalYield_pct:2.7, absorptionRate_pct:52 },
  { zoneId:"BLR-DEV-05", period:"2025-Q3", avgPriceSqft_sell:5300, avgPriceSqft_rent:12, listingCount:220, searchVolume:15000, readyToMove_pct:27, underConstruction_pct:73, yoyPriceChange_pct:22.0, rentalYield_pct:2.7, absorptionRate_pct:53 },
  { zoneId:"BLR-DEV-05", period:"2025-Q4", avgPriceSqft_sell:5700, avgPriceSqft_rent:13, listingCount:240, searchVolume:16800, readyToMove_pct:26, underConstruction_pct:74, yoyPriceChange_pct:24.0, rentalYield_pct:2.7, absorptionRate_pct:55 },
  { zoneId:"BLR-DEV-05", period:"2026-Q1", avgPriceSqft_sell:6200, avgPriceSqft_rent:14, listingCount:265, searchVolume:18500, readyToMove_pct:27, underConstruction_pct:73, yoyPriceChange_pct:26.5, rentalYield_pct:2.7, absorptionRate_pct:57 },

  // ── HYDERABAD — Gachibowli ──────────────────────────────
  { zoneId:"HYD-GAC-01", period:"2025-Q1", avgPriceSqft_sell:8000, avgPriceSqft_rent:24, listingCount:400, searchVolume:25000, readyToMove_pct:50, underConstruction_pct:50, yoyPriceChange_pct:9.0, rentalYield_pct:3.6, absorptionRate_pct:70 },
  { zoneId:"HYD-GAC-01", period:"2025-Q2", avgPriceSqft_sell:8250, avgPriceSqft_rent:25, listingCount:415, searchVolume:26000, readyToMove_pct:51, underConstruction_pct:49, yoyPriceChange_pct:9.5, rentalYield_pct:3.6, absorptionRate_pct:71 },
  { zoneId:"HYD-GAC-01", period:"2025-Q3", avgPriceSqft_sell:8500, avgPriceSqft_rent:25, listingCount:425, searchVolume:27000, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:10.0, rentalYield_pct:3.5, absorptionRate_pct:72 },
  { zoneId:"HYD-GAC-01", period:"2025-Q4", avgPriceSqft_sell:8750, avgPriceSqft_rent:26, listingCount:435, searchVolume:28000, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:10.5, rentalYield_pct:3.6, absorptionRate_pct:73 },
  { zoneId:"HYD-GAC-01", period:"2026-Q1", avgPriceSqft_sell:9050, avgPriceSqft_rent:27, listingCount:450, searchVolume:29500, readyToMove_pct:53, underConstruction_pct:47, yoyPriceChange_pct:11.0, rentalYield_pct:3.6, absorptionRate_pct:74 },

  // ── HYDERABAD — Kokapet ─────────────────────────────────
  { zoneId:"HYD-KOK-02", period:"2025-Q1", avgPriceSqft_sell:6500, avgPriceSqft_rent:15, listingCount:120, searchVolume:9000, readyToMove_pct:25, underConstruction_pct:75, yoyPriceChange_pct:22.0, rentalYield_pct:2.8, absorptionRate_pct:48 },
  { zoneId:"HYD-KOK-02", period:"2025-Q2", avgPriceSqft_sell:7100, avgPriceSqft_rent:16, listingCount:140, searchVolume:10500, readyToMove_pct:24, underConstruction_pct:76, yoyPriceChange_pct:25.0, rentalYield_pct:2.7, absorptionRate_pct:50 },
  { zoneId:"HYD-KOK-02", period:"2025-Q3", avgPriceSqft_sell:7700, avgPriceSqft_rent:17, listingCount:160, searchVolume:12000, readyToMove_pct:23, underConstruction_pct:77, yoyPriceChange_pct:28.0, rentalYield_pct:2.6, absorptionRate_pct:52 },
  { zoneId:"HYD-KOK-02", period:"2025-Q4", avgPriceSqft_sell:8300, avgPriceSqft_rent:18, listingCount:180, searchVolume:13800, readyToMove_pct:22, underConstruction_pct:78, yoyPriceChange_pct:30.0, rentalYield_pct:2.6, absorptionRate_pct:54 },
  { zoneId:"HYD-KOK-02", period:"2026-Q1", avgPriceSqft_sell:9000, avgPriceSqft_rent:20, listingCount:200, searchVolume:15500, readyToMove_pct:23, underConstruction_pct:77, yoyPriceChange_pct:32.0, rentalYield_pct:2.7, absorptionRate_pct:56 },

  // ── HYDERABAD — Narsingi ────────────────────────────────
  { zoneId:"HYD-NAR-03", period:"2025-Q1", avgPriceSqft_sell:7000, avgPriceSqft_rent:19, listingCount:250, searchVolume:14000, readyToMove_pct:45, underConstruction_pct:55, yoyPriceChange_pct:10.0, rentalYield_pct:3.3, absorptionRate_pct:62 },
  { zoneId:"HYD-NAR-03", period:"2025-Q2", avgPriceSqft_sell:7250, avgPriceSqft_rent:20, listingCount:260, searchVolume:14800, readyToMove_pct:44, underConstruction_pct:56, yoyPriceChange_pct:10.8, rentalYield_pct:3.3, absorptionRate_pct:63 },
  { zoneId:"HYD-NAR-03", period:"2025-Q3", avgPriceSqft_sell:7500, avgPriceSqft_rent:20, listingCount:268, searchVolume:15200, readyToMove_pct:43, underConstruction_pct:57, yoyPriceChange_pct:11.5, rentalYield_pct:3.2, absorptionRate_pct:64 },
  { zoneId:"HYD-NAR-03", period:"2025-Q4", avgPriceSqft_sell:7750, avgPriceSqft_rent:21, listingCount:275, searchVolume:15800, readyToMove_pct:43, underConstruction_pct:57, yoyPriceChange_pct:12.0, rentalYield_pct:3.3, absorptionRate_pct:65 },
  { zoneId:"HYD-NAR-03", period:"2026-Q1", avgPriceSqft_sell:8050, avgPriceSqft_rent:22, listingCount:285, searchVolume:16500, readyToMove_pct:44, underConstruction_pct:56, yoyPriceChange_pct:12.8, rentalYield_pct:3.3, absorptionRate_pct:66 },

  // ── HYDERABAD — Shamshabad ──────────────────────────────
  { zoneId:"HYD-SHA-04", period:"2025-Q1", avgPriceSqft_sell:4000, avgPriceSqft_rent:9, listingCount:100, searchVolume:7000, readyToMove_pct:28, underConstruction_pct:72, yoyPriceChange_pct:15.0, rentalYield_pct:2.7, absorptionRate_pct:45 },
  { zoneId:"HYD-SHA-04", period:"2025-Q2", avgPriceSqft_sell:4300, avgPriceSqft_rent:10, listingCount:115, searchVolume:7800, readyToMove_pct:27, underConstruction_pct:73, yoyPriceChange_pct:17.0, rentalYield_pct:2.8, absorptionRate_pct:47 },
  { zoneId:"HYD-SHA-04", period:"2025-Q3", avgPriceSqft_sell:4650, avgPriceSqft_rent:10, listingCount:128, searchVolume:8500, readyToMove_pct:26, underConstruction_pct:74, yoyPriceChange_pct:19.0, rentalYield_pct:2.6, absorptionRate_pct:48 },
  { zoneId:"HYD-SHA-04", period:"2025-Q4", avgPriceSqft_sell:5000, avgPriceSqft_rent:11, listingCount:140, searchVolume:9200, readyToMove_pct:25, underConstruction_pct:75, yoyPriceChange_pct:21.0, rentalYield_pct:2.6, absorptionRate_pct:50 },
  { zoneId:"HYD-SHA-04", period:"2026-Q1", avgPriceSqft_sell:5400, avgPriceSqft_rent:12, listingCount:155, searchVolume:10000, readyToMove_pct:26, underConstruction_pct:74, yoyPriceChange_pct:23.0, rentalYield_pct:2.7, absorptionRate_pct:52 },

  // ── HYDERABAD — Medchal ─────────────────────────────────
  { zoneId:"HYD-MED-05", period:"2025-Q1", avgPriceSqft_sell:3800, avgPriceSqft_rent:8, listingCount:90, searchVolume:5500, readyToMove_pct:38, underConstruction_pct:62, yoyPriceChange_pct:8.0, rentalYield_pct:2.5, absorptionRate_pct:52 },
  { zoneId:"HYD-MED-05", period:"2025-Q2", avgPriceSqft_sell:3950, avgPriceSqft_rent:8, listingCount:95, searchVolume:5800, readyToMove_pct:37, underConstruction_pct:63, yoyPriceChange_pct:8.5, rentalYield_pct:2.4, absorptionRate_pct:53 },
  { zoneId:"HYD-MED-05", period:"2025-Q3", avgPriceSqft_sell:4100, avgPriceSqft_rent:9, listingCount:100, searchVolume:6000, readyToMove_pct:36, underConstruction_pct:64, yoyPriceChange_pct:9.0, rentalYield_pct:2.6, absorptionRate_pct:54 },
  { zoneId:"HYD-MED-05", period:"2025-Q4", avgPriceSqft_sell:4250, avgPriceSqft_rent:9, listingCount:105, searchVolume:6300, readyToMove_pct:36, underConstruction_pct:64, yoyPriceChange_pct:9.2, rentalYield_pct:2.5, absorptionRate_pct:55 },
  { zoneId:"HYD-MED-05", period:"2026-Q1", avgPriceSqft_sell:4400, avgPriceSqft_rent:10, listingCount:110, searchVolume:6600, readyToMove_pct:37, underConstruction_pct:63, yoyPriceChange_pct:9.5, rentalYield_pct:2.7, absorptionRate_pct:56 },

  // ── MUMBAI — Panvel ─────────────────────────────────────
  { zoneId:"MUM-PAN-01", period:"2025-Q1", avgPriceSqft_sell:6200, avgPriceSqft_rent:16, listingCount:350, searchVolume:20000, readyToMove_pct:38, underConstruction_pct:62, yoyPriceChange_pct:14.0, rentalYield_pct:3.1, absorptionRate_pct:58 },
  { zoneId:"MUM-PAN-01", period:"2025-Q2", avgPriceSqft_sell:6600, avgPriceSqft_rent:17, listingCount:380, searchVolume:22000, readyToMove_pct:37, underConstruction_pct:63, yoyPriceChange_pct:16.0, rentalYield_pct:3.1, absorptionRate_pct:60 },
  { zoneId:"MUM-PAN-01", period:"2025-Q3", avgPriceSqft_sell:7000, avgPriceSqft_rent:18, listingCount:410, searchVolume:24000, readyToMove_pct:36, underConstruction_pct:64, yoyPriceChange_pct:18.0, rentalYield_pct:3.1, absorptionRate_pct:62 },
  { zoneId:"MUM-PAN-01", period:"2025-Q4", avgPriceSqft_sell:7400, avgPriceSqft_rent:19, listingCount:440, searchVolume:26000, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:20.0, rentalYield_pct:3.1, absorptionRate_pct:64 },
  { zoneId:"MUM-PAN-01", period:"2026-Q1", avgPriceSqft_sell:7900, avgPriceSqft_rent:20, listingCount:470, searchVolume:28500, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:22.0, rentalYield_pct:3.0, absorptionRate_pct:66 },

  // ── MUMBAI — Thane West ─────────────────────────────────
  { zoneId:"MUM-THA-02", period:"2025-Q1", avgPriceSqft_sell:12000, avgPriceSqft_rent:30, listingCount:520, searchVolume:32000, readyToMove_pct:55, underConstruction_pct:45, yoyPriceChange_pct:6.0, rentalYield_pct:3.0, absorptionRate_pct:72 },
  { zoneId:"MUM-THA-02", period:"2025-Q2", avgPriceSqft_sell:12200, avgPriceSqft_rent:31, listingCount:530, searchVolume:32500, readyToMove_pct:56, underConstruction_pct:44, yoyPriceChange_pct:5.8, rentalYield_pct:3.0, absorptionRate_pct:73 },
  { zoneId:"MUM-THA-02", period:"2025-Q3", avgPriceSqft_sell:12450, avgPriceSqft_rent:31, listingCount:535, searchVolume:33000, readyToMove_pct:57, underConstruction_pct:43, yoyPriceChange_pct:5.5, rentalYield_pct:3.0, absorptionRate_pct:73 },
  { zoneId:"MUM-THA-02", period:"2025-Q4", avgPriceSqft_sell:12700, avgPriceSqft_rent:32, listingCount:540, searchVolume:33500, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:5.2, rentalYield_pct:3.0, absorptionRate_pct:74 },
  { zoneId:"MUM-THA-02", period:"2026-Q1", avgPriceSqft_sell:12950, avgPriceSqft_rent:33, listingCount:545, searchVolume:34000, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:5.5, rentalYield_pct:3.1, absorptionRate_pct:75 },

  // ── MUMBAI — Kharghar ───────────────────────────────────
  { zoneId:"MUM-KHR-03", period:"2025-Q1", avgPriceSqft_sell:8500, avgPriceSqft_rent:22, listingCount:280, searchVolume:18000, readyToMove_pct:48, underConstruction_pct:52, yoyPriceChange_pct:8.0, rentalYield_pct:3.1, absorptionRate_pct:65 },
  { zoneId:"MUM-KHR-03", period:"2025-Q2", avgPriceSqft_sell:8750, avgPriceSqft_rent:23, listingCount:290, searchVolume:18800, readyToMove_pct:47, underConstruction_pct:53, yoyPriceChange_pct:8.5, rentalYield_pct:3.2, absorptionRate_pct:66 },
  { zoneId:"MUM-KHR-03", period:"2025-Q3", avgPriceSqft_sell:9000, avgPriceSqft_rent:23, listingCount:300, searchVolume:19500, readyToMove_pct:47, underConstruction_pct:53, yoyPriceChange_pct:9.0, rentalYield_pct:3.1, absorptionRate_pct:67 },
  { zoneId:"MUM-KHR-03", period:"2025-Q4", avgPriceSqft_sell:9250, avgPriceSqft_rent:24, listingCount:308, searchVolume:20000, readyToMove_pct:46, underConstruction_pct:54, yoyPriceChange_pct:9.5, rentalYield_pct:3.1, absorptionRate_pct:68 },
  { zoneId:"MUM-KHR-03", period:"2026-Q1", avgPriceSqft_sell:9550, avgPriceSqft_rent:25, listingCount:315, searchVolume:20800, readyToMove_pct:46, underConstruction_pct:54, yoyPriceChange_pct:10.0, rentalYield_pct:3.1, absorptionRate_pct:69 },

  // ── MUMBAI — Virar ──────────────────────────────────────
  { zoneId:"MUM-VIR-04", period:"2025-Q1", avgPriceSqft_sell:4500, avgPriceSqft_rent:10, listingCount:200, searchVolume:12000, readyToMove_pct:42, underConstruction_pct:58, yoyPriceChange_pct:7.0, rentalYield_pct:2.7, absorptionRate_pct:55 },
  { zoneId:"MUM-VIR-04", period:"2025-Q2", avgPriceSqft_sell:4600, avgPriceSqft_rent:10, listingCount:210, searchVolume:12500, readyToMove_pct:41, underConstruction_pct:59, yoyPriceChange_pct:7.2, rentalYield_pct:2.6, absorptionRate_pct:56 },
  { zoneId:"MUM-VIR-04", period:"2025-Q3", avgPriceSqft_sell:4700, avgPriceSqft_rent:11, listingCount:215, searchVolume:12800, readyToMove_pct:40, underConstruction_pct:60, yoyPriceChange_pct:7.5, rentalYield_pct:2.8, absorptionRate_pct:57 },
  { zoneId:"MUM-VIR-04", period:"2025-Q4", avgPriceSqft_sell:4800, avgPriceSqft_rent:11, listingCount:220, searchVolume:13000, readyToMove_pct:40, underConstruction_pct:60, yoyPriceChange_pct:7.8, rentalYield_pct:2.8, absorptionRate_pct:57 },
  { zoneId:"MUM-VIR-04", period:"2026-Q1", avgPriceSqft_sell:4950, avgPriceSqft_rent:11, listingCount:225, searchVolume:13400, readyToMove_pct:41, underConstruction_pct:59, yoyPriceChange_pct:8.0, rentalYield_pct:2.7, absorptionRate_pct:58 },

  // ── MUMBAI — Dahisar East ───────────────────────────────
  { zoneId:"MUM-DAH-05", period:"2025-Q1", avgPriceSqft_sell:14000, avgPriceSqft_rent:35, listingCount:160, searchVolume:9500, readyToMove_pct:62, underConstruction_pct:38, yoyPriceChange_pct:4.5, rentalYield_pct:3.0, absorptionRate_pct:74 },
  { zoneId:"MUM-DAH-05", period:"2025-Q2", avgPriceSqft_sell:14200, avgPriceSqft_rent:36, listingCount:162, searchVolume:9600, readyToMove_pct:63, underConstruction_pct:37, yoyPriceChange_pct:4.2, rentalYield_pct:3.0, absorptionRate_pct:75 },
  { zoneId:"MUM-DAH-05", period:"2025-Q3", avgPriceSqft_sell:14400, avgPriceSqft_rent:36, listingCount:165, searchVolume:9800, readyToMove_pct:63, underConstruction_pct:37, yoyPriceChange_pct:4.0, rentalYield_pct:3.0, absorptionRate_pct:75 },
  { zoneId:"MUM-DAH-05", period:"2025-Q4", avgPriceSqft_sell:14600, avgPriceSqft_rent:37, listingCount:168, searchVolume:10000, readyToMove_pct:64, underConstruction_pct:36, yoyPriceChange_pct:4.5, rentalYield_pct:3.0, absorptionRate_pct:76 },
  { zoneId:"MUM-DAH-05", period:"2026-Q1", avgPriceSqft_sell:14850, avgPriceSqft_rent:38, listingCount:170, searchVolume:10200, readyToMove_pct:64, underConstruction_pct:36, yoyPriceChange_pct:4.8, rentalYield_pct:3.1, absorptionRate_pct:76 },

  // ── NOIDA — Sector 150 ──────────────────────────────────
  { zoneId:"NOI-SEC-01", period:"2025-Q1", avgPriceSqft_sell:5500, avgPriceSqft_rent:13, listingCount:200, searchVolume:11000, readyToMove_pct:32, underConstruction_pct:68, yoyPriceChange_pct:16.0, rentalYield_pct:2.8, absorptionRate_pct:52 },
  { zoneId:"NOI-SEC-01", period:"2025-Q2", avgPriceSqft_sell:5900, avgPriceSqft_rent:14, listingCount:220, searchVolume:12500, readyToMove_pct:31, underConstruction_pct:69, yoyPriceChange_pct:18.0, rentalYield_pct:2.8, absorptionRate_pct:54 },
  { zoneId:"NOI-SEC-01", period:"2025-Q3", avgPriceSqft_sell:6300, avgPriceSqft_rent:15, listingCount:240, searchVolume:14000, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:20.0, rentalYield_pct:2.9, absorptionRate_pct:55 },
  { zoneId:"NOI-SEC-01", period:"2025-Q4", avgPriceSqft_sell:6700, avgPriceSqft_rent:16, listingCount:260, searchVolume:15500, readyToMove_pct:29, underConstruction_pct:71, yoyPriceChange_pct:22.0, rentalYield_pct:2.9, absorptionRate_pct:57 },
  { zoneId:"NOI-SEC-01", period:"2026-Q1", avgPriceSqft_sell:7200, avgPriceSqft_rent:17, listingCount:280, searchVolume:17000, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:24.0, rentalYield_pct:2.8, absorptionRate_pct:58 },

  // ── NOIDA — Greater Noida West ──────────────────────────
  { zoneId:"NOI-GRN-02", period:"2025-Q1", avgPriceSqft_sell:3800, avgPriceSqft_rent:8, listingCount:450, searchVolume:22000, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:10.0, rentalYield_pct:2.5, absorptionRate_pct:50 },
  { zoneId:"NOI-GRN-02", period:"2025-Q2", avgPriceSqft_sell:4000, avgPriceSqft_rent:9, listingCount:460, searchVolume:22800, readyToMove_pct:34, underConstruction_pct:66, yoyPriceChange_pct:11.0, rentalYield_pct:2.7, absorptionRate_pct:51 },
  { zoneId:"NOI-GRN-02", period:"2025-Q3", avgPriceSqft_sell:4200, avgPriceSqft_rent:9, listingCount:470, searchVolume:23500, readyToMove_pct:33, underConstruction_pct:67, yoyPriceChange_pct:12.0, rentalYield_pct:2.6, absorptionRate_pct:52 },
  { zoneId:"NOI-GRN-02", period:"2025-Q4", avgPriceSqft_sell:4400, avgPriceSqft_rent:10, listingCount:480, searchVolume:24200, readyToMove_pct:33, underConstruction_pct:67, yoyPriceChange_pct:13.0, rentalYield_pct:2.7, absorptionRate_pct:53 },
  { zoneId:"NOI-GRN-02", period:"2026-Q1", avgPriceSqft_sell:4650, avgPriceSqft_rent:10, listingCount:490, searchVolume:25000, readyToMove_pct:34, underConstruction_pct:66, yoyPriceChange_pct:14.0, rentalYield_pct:2.6, absorptionRate_pct:54 },

  // ── NOIDA — Yamuna Expressway ───────────────────────────
  { zoneId:"NOI-YEX-03", period:"2025-Q1", avgPriceSqft_sell:2800, avgPriceSqft_rent:5, listingCount:300, searchVolume:18000, readyToMove_pct:20, underConstruction_pct:80, yoyPriceChange_pct:25.0, rentalYield_pct:2.1, absorptionRate_pct:42 },
  { zoneId:"NOI-YEX-03", period:"2025-Q2", avgPriceSqft_sell:3200, avgPriceSqft_rent:6, listingCount:340, searchVolume:20000, readyToMove_pct:19, underConstruction_pct:81, yoyPriceChange_pct:28.0, rentalYield_pct:2.3, absorptionRate_pct:44 },
  { zoneId:"NOI-YEX-03", period:"2025-Q3", avgPriceSqft_sell:3600, avgPriceSqft_rent:7, listingCount:380, searchVolume:22500, readyToMove_pct:18, underConstruction_pct:82, yoyPriceChange_pct:32.0, rentalYield_pct:2.3, absorptionRate_pct:45 },
  { zoneId:"NOI-YEX-03", period:"2025-Q4", avgPriceSqft_sell:4100, avgPriceSqft_rent:7, listingCount:420, searchVolume:25000, readyToMove_pct:18, underConstruction_pct:82, yoyPriceChange_pct:35.0, rentalYield_pct:2.0, absorptionRate_pct:46 },
  { zoneId:"NOI-YEX-03", period:"2026-Q1", avgPriceSqft_sell:4700, avgPriceSqft_rent:8, listingCount:460, searchVolume:28000, readyToMove_pct:19, underConstruction_pct:81, yoyPriceChange_pct:38.0, rentalYield_pct:2.0, absorptionRate_pct:48 },

  // ── NOIDA — Sector 62 ──────────────────────────────────
  { zoneId:"NOI-SEC-04", period:"2025-Q1", avgPriceSqft_sell:7800, avgPriceSqft_rent:22, listingCount:180, searchVolume:10000, readyToMove_pct:58, underConstruction_pct:42, yoyPriceChange_pct:5.0, rentalYield_pct:3.4, absorptionRate_pct:70 },
  { zoneId:"NOI-SEC-04", period:"2025-Q2", avgPriceSqft_sell:7950, avgPriceSqft_rent:22, listingCount:185, searchVolume:10200, readyToMove_pct:59, underConstruction_pct:41, yoyPriceChange_pct:4.8, rentalYield_pct:3.3, absorptionRate_pct:71 },
  { zoneId:"NOI-SEC-04", period:"2025-Q3", avgPriceSqft_sell:8100, avgPriceSqft_rent:23, listingCount:188, searchVolume:10500, readyToMove_pct:60, underConstruction_pct:40, yoyPriceChange_pct:5.0, rentalYield_pct:3.4, absorptionRate_pct:72 },
  { zoneId:"NOI-SEC-04", period:"2025-Q4", avgPriceSqft_sell:8250, avgPriceSqft_rent:23, listingCount:190, searchVolume:10800, readyToMove_pct:60, underConstruction_pct:40, yoyPriceChange_pct:5.2, rentalYield_pct:3.4, absorptionRate_pct:72 },
  { zoneId:"NOI-SEC-04", period:"2026-Q1", avgPriceSqft_sell:8400, avgPriceSqft_rent:24, listingCount:192, searchVolume:11000, readyToMove_pct:61, underConstruction_pct:39, yoyPriceChange_pct:5.5, rentalYield_pct:3.4, absorptionRate_pct:73 },

  // ── NOIDA — Dwarka Expressway ───────────────────────────
  { zoneId:"NOI-GUR-05", period:"2025-Q1", avgPriceSqft_sell:9500, avgPriceSqft_rent:22, listingCount:350, searchVolume:26000, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:18.0, rentalYield_pct:2.8, absorptionRate_pct:55 },
  { zoneId:"NOI-GUR-05", period:"2025-Q2", avgPriceSqft_sell:10200, avgPriceSqft_rent:24, listingCount:380, searchVolume:28000, readyToMove_pct:32, underConstruction_pct:68, yoyPriceChange_pct:20.0, rentalYield_pct:2.8, absorptionRate_pct:58 },
  { zoneId:"NOI-GUR-05", period:"2025-Q3", avgPriceSqft_sell:10900, avgPriceSqft_rent:25, listingCount:410, searchVolume:30000, readyToMove_pct:34, underConstruction_pct:66, yoyPriceChange_pct:22.0, rentalYield_pct:2.8, absorptionRate_pct:60 },
  { zoneId:"NOI-GUR-05", period:"2025-Q4", avgPriceSqft_sell:11600, avgPriceSqft_rent:27, listingCount:440, searchVolume:32000, readyToMove_pct:36, underConstruction_pct:64, yoyPriceChange_pct:24.0, rentalYield_pct:2.8, absorptionRate_pct:62 },
  { zoneId:"NOI-GUR-05", period:"2026-Q1", avgPriceSqft_sell:12400, avgPriceSqft_rent:29, listingCount:470, searchVolume:34500, readyToMove_pct:38, underConstruction_pct:62, yoyPriceChange_pct:26.0, rentalYield_pct:2.8, absorptionRate_pct:64 },

  // ── CHENNAI — OMR ───────────────────────────────────────
  { zoneId:"CHE-OMR-01", period:"2025-Q1", avgPriceSqft_sell:6800, avgPriceSqft_rent:18, listingCount:380, searchVolume:20000, readyToMove_pct:50, underConstruction_pct:50, yoyPriceChange_pct:8.5, rentalYield_pct:3.2, absorptionRate_pct:64 },
  { zoneId:"CHE-OMR-01", period:"2025-Q2", avgPriceSqft_sell:7050, avgPriceSqft_rent:19, listingCount:395, searchVolume:21000, readyToMove_pct:49, underConstruction_pct:51, yoyPriceChange_pct:9.0, rentalYield_pct:3.2, absorptionRate_pct:65 },
  { zoneId:"CHE-OMR-01", period:"2025-Q3", avgPriceSqft_sell:7300, avgPriceSqft_rent:19, listingCount:410, searchVolume:22000, readyToMove_pct:48, underConstruction_pct:52, yoyPriceChange_pct:9.5, rentalYield_pct:3.1, absorptionRate_pct:66 },
  { zoneId:"CHE-OMR-01", period:"2025-Q4", avgPriceSqft_sell:7550, avgPriceSqft_rent:20, listingCount:420, searchVolume:23000, readyToMove_pct:48, underConstruction_pct:52, yoyPriceChange_pct:10.0, rentalYield_pct:3.2, absorptionRate_pct:67 },
  { zoneId:"CHE-OMR-01", period:"2026-Q1", avgPriceSqft_sell:7850, avgPriceSqft_rent:21, listingCount:435, searchVolume:24000, readyToMove_pct:49, underConstruction_pct:51, yoyPriceChange_pct:10.5, rentalYield_pct:3.2, absorptionRate_pct:68 },

  // ── CHENNAI — Porur ─────────────────────────────────────
  { zoneId:"CHE-POR-02", period:"2025-Q1", avgPriceSqft_sell:5800, avgPriceSqft_rent:14, listingCount:200, searchVolume:10000, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:7.0, rentalYield_pct:2.9, absorptionRate_pct:62 },
  { zoneId:"CHE-POR-02", period:"2025-Q2", avgPriceSqft_sell:5950, avgPriceSqft_rent:15, listingCount:208, searchVolume:10500, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:7.5, rentalYield_pct:3.0, absorptionRate_pct:63 },
  { zoneId:"CHE-POR-02", period:"2025-Q3", avgPriceSqft_sell:6100, avgPriceSqft_rent:15, listingCount:215, searchVolume:11000, readyToMove_pct:53, underConstruction_pct:47, yoyPriceChange_pct:7.8, rentalYield_pct:3.0, absorptionRate_pct:64 },
  { zoneId:"CHE-POR-02", period:"2025-Q4", avgPriceSqft_sell:6250, avgPriceSqft_rent:16, listingCount:220, searchVolume:11200, readyToMove_pct:54, underConstruction_pct:46, yoyPriceChange_pct:8.0, rentalYield_pct:3.1, absorptionRate_pct:65 },
  { zoneId:"CHE-POR-02", period:"2026-Q1", avgPriceSqft_sell:6450, avgPriceSqft_rent:16, listingCount:228, searchVolume:11800, readyToMove_pct:54, underConstruction_pct:46, yoyPriceChange_pct:8.5, rentalYield_pct:3.0, absorptionRate_pct:66 },

  // ── CHENNAI — Kelambakkam ───────────────────────────────
  { zoneId:"CHE-KLP-03", period:"2025-Q1", avgPriceSqft_sell:4200, avgPriceSqft_rent:9, listingCount:140, searchVolume:7500, readyToMove_pct:35, underConstruction_pct:65, yoyPriceChange_pct:12.0, rentalYield_pct:2.6, absorptionRate_pct:52 },
  { zoneId:"CHE-KLP-03", period:"2025-Q2", avgPriceSqft_sell:4500, avgPriceSqft_rent:10, listingCount:155, searchVolume:8200, readyToMove_pct:34, underConstruction_pct:66, yoyPriceChange_pct:13.5, rentalYield_pct:2.7, absorptionRate_pct:53 },
  { zoneId:"CHE-KLP-03", period:"2025-Q3", avgPriceSqft_sell:4800, avgPriceSqft_rent:10, listingCount:170, searchVolume:9000, readyToMove_pct:33, underConstruction_pct:67, yoyPriceChange_pct:15.0, rentalYield_pct:2.5, absorptionRate_pct:54 },
  { zoneId:"CHE-KLP-03", period:"2025-Q4", avgPriceSqft_sell:5100, avgPriceSqft_rent:11, listingCount:185, searchVolume:9800, readyToMove_pct:32, underConstruction_pct:68, yoyPriceChange_pct:16.5, rentalYield_pct:2.6, absorptionRate_pct:55 },
  { zoneId:"CHE-KLP-03", period:"2026-Q1", avgPriceSqft_sell:5450, avgPriceSqft_rent:12, listingCount:200, searchVolume:10800, readyToMove_pct:33, underConstruction_pct:67, yoyPriceChange_pct:18.0, rentalYield_pct:2.6, absorptionRate_pct:56 },

  // ── CHENNAI — Mahindra City ─────────────────────────────
  { zoneId:"CHE-MAH-04", period:"2025-Q1", avgPriceSqft_sell:3500, avgPriceSqft_rent:7, listingCount:80, searchVolume:4500, readyToMove_pct:30, underConstruction_pct:70, yoyPriceChange_pct:10.0, rentalYield_pct:2.4, absorptionRate_pct:48 },
  { zoneId:"CHE-MAH-04", period:"2025-Q2", avgPriceSqft_sell:3700, avgPriceSqft_rent:8, listingCount:90, searchVolume:5000, readyToMove_pct:29, underConstruction_pct:71, yoyPriceChange_pct:11.5, rentalYield_pct:2.6, absorptionRate_pct:49 },
  { zoneId:"CHE-MAH-04", period:"2025-Q3", avgPriceSqft_sell:3900, avgPriceSqft_rent:8, listingCount:100, searchVolume:5500, readyToMove_pct:28, underConstruction_pct:72, yoyPriceChange_pct:13.0, rentalYield_pct:2.5, absorptionRate_pct:50 },
  { zoneId:"CHE-MAH-04", period:"2025-Q4", avgPriceSqft_sell:4100, avgPriceSqft_rent:9, listingCount:112, searchVolume:6000, readyToMove_pct:28, underConstruction_pct:72, yoyPriceChange_pct:14.5, rentalYield_pct:2.6, absorptionRate_pct:51 },
  { zoneId:"CHE-MAH-04", period:"2026-Q1", avgPriceSqft_sell:4350, avgPriceSqft_rent:9, listingCount:125, searchVolume:6800, readyToMove_pct:29, underConstruction_pct:71, yoyPriceChange_pct:16.0, rentalYield_pct:2.5, absorptionRate_pct:52 },

  // ── CHENNAI — Medavakkam ────────────────────────────────
  { zoneId:"CHE-MED-05", period:"2025-Q1", avgPriceSqft_sell:5200, avgPriceSqft_rent:13, listingCount:220, searchVolume:11000, readyToMove_pct:50, underConstruction_pct:50, yoyPriceChange_pct:7.5, rentalYield_pct:3.0, absorptionRate_pct:62 },
  { zoneId:"CHE-MED-05", period:"2025-Q2", avgPriceSqft_sell:5350, avgPriceSqft_rent:13, listingCount:228, searchVolume:11500, readyToMove_pct:50, underConstruction_pct:50, yoyPriceChange_pct:7.8, rentalYield_pct:2.9, absorptionRate_pct:63 },
  { zoneId:"CHE-MED-05", period:"2025-Q3", avgPriceSqft_sell:5500, avgPriceSqft_rent:14, listingCount:235, searchVolume:12000, readyToMove_pct:51, underConstruction_pct:49, yoyPriceChange_pct:8.0, rentalYield_pct:3.1, absorptionRate_pct:64 },
  { zoneId:"CHE-MED-05", period:"2025-Q4", avgPriceSqft_sell:5650, avgPriceSqft_rent:14, listingCount:240, searchVolume:12200, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:8.2, rentalYield_pct:3.0, absorptionRate_pct:65 },
  { zoneId:"CHE-MED-05", period:"2026-Q1", avgPriceSqft_sell:5850, avgPriceSqft_rent:15, listingCount:248, searchVolume:12800, readyToMove_pct:52, underConstruction_pct:48, yoyPriceChange_pct:8.5, rentalYield_pct:3.1, absorptionRate_pct:66 },
];
