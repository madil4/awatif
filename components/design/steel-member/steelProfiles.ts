export type SteelProfileProps = {
  h: number; // Overall depth (mm)
  b: number; // Flange width (mm)
  tw: number; // Web thickness (mm)
  tf: number; // Flange thickness (mm)
  r: number; // Root radius (mm)
  A: number; // Cross-section area (mm²)
  Iy: number; // Second moment of area, major axis (mm⁴)
  Iz: number; // Second moment of area, minor axis (mm⁴)
  It: number; // Saint-Venant torsional constant (mm⁴)
  Wpl_y: number; // Plastic section modulus, major axis (mm³)
  Wel_y: number; // Elastic section modulus, major axis (mm³)
};

export type SteelGradeProps = {
  fy: number; // Yield strength (MPa)
  fu: number; // Ultimate tensile strength (MPa)
};

// Section properties from EN 10365 / ArcelorMittal sections booklet
export const STEEL_PROFILES: Record<string, SteelProfileProps> = {
  // ── IPE ──────────────────────────────────────────────────────────────
  // It values from ArcelorMittal Orange Book (cm⁴ × 1e4 → mm⁴)
  "IPE 80":  { h: 80,  b: 46,  tw: 3.8,  tf: 5.2,  r: 5,  A: 764,   Iy: 801300,     Iz: 84490,    It: 143000,   Wpl_y: 23220,   Wel_y: 20030  },
  "IPE 100": { h: 100, b: 55,  tw: 4.1,  tf: 5.7,  r: 7,  A: 1032,  Iy: 1710000,    Iz: 159100,   It: 158000,   Wpl_y: 39410,   Wel_y: 34200  },
  "IPE 120": { h: 120, b: 64,  tw: 4.4,  tf: 6.3,  r: 7,  A: 1321,  Iy: 3180000,    Iz: 277700,   It: 179000,   Wpl_y: 60730,   Wel_y: 53000  },
  "IPE 140": { h: 140, b: 73,  tw: 4.7,  tf: 6.9,  r: 7,  A: 1643,  Iy: 5410000,    Iz: 449200,   It: 196000,   Wpl_y: 88340,   Wel_y: 77330  },
  "IPE 160": { h: 160, b: 82,  tw: 5.0,  tf: 7.4,  r: 9,  A: 2009,  Iy: 8690000,    Iz: 683100,   It: 205000,   Wpl_y: 123900,  Wel_y: 108700 },
  "IPE 180": { h: 180, b: 91,  tw: 5.3,  tf: 8.0,  r: 9,  A: 2395,  Iy: 13170000,   Iz: 1009000,  It: 218000,   Wpl_y: 166400,  Wel_y: 146300 },
  "IPE 200": { h: 200, b: 100, tw: 5.6,  tf: 8.5,  r: 12, A: 2848,  Iy: 19430000,   Iz: 1424000,  It: 220000,   Wpl_y: 220600,  Wel_y: 194300 },
  "IPE 220": { h: 220, b: 110, tw: 5.9,  tf: 9.2,  r: 12, A: 3337,  Iy: 27720000,   Iz: 2047000,  It: 229000,   Wpl_y: 285400,  Wel_y: 252000 },
  "IPE 240": { h: 240, b: 120, tw: 6.2,  tf: 9.8,  r: 15, A: 3912,  Iy: 38920000,   Iz: 2836000,  It: 226000,   Wpl_y: 366600,  Wel_y: 324300 },
  "IPE 270": { h: 270, b: 135, tw: 6.6,  tf: 10.2, r: 15, A: 4595,  Iy: 57900000,   Iz: 4199000,  It: 249000,   Wpl_y: 484000,  Wel_y: 428900 },
  "IPE 300": { h: 300, b: 150, tw: 7.1,  tf: 10.7, r: 15, A: 5381,  Iy: 83560000,   Iz: 6038000,  It: 268000,   Wpl_y: 628400,  Wel_y: 557100 },
  "IPE 330": { h: 330, b: 160, tw: 7.5,  tf: 11.5, r: 18, A: 6261,  Iy: 117700000,  Iz: 7881000,  It: 268000,   Wpl_y: 804300,  Wel_y: 713100 },
  "IPE 360": { h: 360, b: 170, tw: 8.0,  tf: 12.7, r: 18, A: 7273,  Iy: 162700000,  Iz: 10430000, It: 273000,   Wpl_y: 1019000, Wel_y: 904000 },
  "IPE 400": { h: 400, b: 180, tw: 8.6,  tf: 13.5, r: 21, A: 8446,  Iy: 231300000,  Iz: 13176000, It: 280000,   Wpl_y: 1307000, Wel_y: 1156000 },
  "IPE 450": { h: 450, b: 190, tw: 9.4,  tf: 14.6, r: 21, A: 9882,  Iy: 337400000,  Iz: 16760000, It: 299000,   Wpl_y: 1702000, Wel_y: 1500000 },
  "IPE 500": { h: 500, b: 200, tw: 10.2, tf: 16.0, r: 21, A: 11550, Iy: 482000000,  Iz: 21400000, It: 311000,   Wpl_y: 2194000, Wel_y: 1928000 },
  "IPE 550": { h: 550, b: 210, tw: 11.1, tf: 17.2, r: 24, A: 13440, Iy: 671200000,  Iz: 26690000, It: 314000,   Wpl_y: 2787000, Wel_y: 2441000 },
  "IPE 600": { h: 600, b: 220, tw: 12.0, tf: 19.0, r: 24, A: 15600, Iy: 920800000,  Iz: 33870000, It: 319000,   Wpl_y: 3512000, Wel_y: 3069000 },

  // ── HEA ──────────────────────────────────────────────────────────────
  // It values from ArcelorMittal Orange Book (cm⁴ × 1e4 → mm⁴)
  "HEA 100": { h: 96,  b: 100, tw: 5.0,  tf: 8.0,  r: 12, A: 2124,  Iy: 3490000,    Iz: 1340000,   It: 52800,    Wpl_y: 83010,   Wel_y: 72760  },
  "HEA 120": { h: 114, b: 120, tw: 5.0,  tf: 8.0,  r: 12, A: 2534,  Iy: 6060000,    Iz: 2300000,   It: 60400,    Wpl_y: 119500,  Wel_y: 106300 },
  "HEA 140": { h: 133, b: 140, tw: 5.5,  tf: 8.5,  r: 12, A: 3142,  Iy: 10330000,   Iz: 3890000,   It: 81000,    Wpl_y: 173500,  Wel_y: 155400 },
  "HEA 160": { h: 152, b: 160, tw: 6.0,  tf: 9.0,  r: 15, A: 3877,  Iy: 16730000,   Iz: 6160000,   It: 121000,   Wpl_y: 245100,  Wel_y: 220100 },
  "HEA 180": { h: 171, b: 180, tw: 6.0,  tf: 9.5,  r: 15, A: 4525,  Iy: 25100000,   Iz: 9240000,   It: 149000,   Wpl_y: 324900,  Wel_y: 293600 },
  "HEA 200": { h: 190, b: 200, tw: 6.5,  tf: 10.0, r: 18, A: 5383,  Iy: 36920000,   Iz: 13360000,  It: 210000,   Wpl_y: 429500,  Wel_y: 388600 },
  "HEA 220": { h: 210, b: 220, tw: 7.0,  tf: 11.0, r: 18, A: 6434,  Iy: 54100000,   Iz: 19530000,  It: 286000,   Wpl_y: 568500,  Wel_y: 515200 },
  "HEA 240": { h: 230, b: 240, tw: 7.5,  tf: 12.0, r: 21, A: 7684,  Iy: 77630000,   Iz: 27680000,  It: 421000,   Wpl_y: 744600,  Wel_y: 675100 },
  "HEA 260": { h: 250, b: 260, tw: 7.5,  tf: 12.5, r: 24, A: 8682,  Iy: 104500000,  Iz: 36730000,  It: 542000,   Wpl_y: 919800,  Wel_y: 836400 },
  "HEA 280": { h: 270, b: 280, tw: 8.0,  tf: 13.0, r: 24, A: 9726,  Iy: 136700000,  Iz: 49830000,  It: 635000,   Wpl_y: 1112000, Wel_y: 1013000 },
  "HEA 300": { h: 290, b: 300, tw: 8.5,  tf: 14.0, r: 27, A: 11253, Iy: 182600000,  Iz: 63100000,  It: 878000,   Wpl_y: 1383000, Wel_y: 1260000 },
  "HEA 320": { h: 310, b: 300, tw: 9.0,  tf: 15.5, r: 27, A: 12440, Iy: 229300000,  Iz: 69850000,  It: 1120000,  Wpl_y: 1628000, Wel_y: 1479000 },
  "HEA 340": { h: 330, b: 300, tw: 9.5,  tf: 16.5, r: 27, A: 13350, Iy: 276900000,  Iz: 74360000,  It: 1310000,  Wpl_y: 1850000, Wel_y: 1678000 },
  "HEA 360": { h: 350, b: 300, tw: 10.0, tf: 17.5, r: 27, A: 14280, Iy: 330900000,  Iz: 78870000,  It: 1530000,  Wpl_y: 2088000, Wel_y: 1891000 },
  "HEA 400": { h: 390, b: 300, tw: 11.0, tf: 19.0, r: 27, A: 15880, Iy: 450700000,  Iz: 85640000,  It: 1930000,  Wpl_y: 2562000, Wel_y: 2311000 },
  "HEA 450": { h: 440, b: 300, tw: 11.5, tf: 21.0, r: 27, A: 17800, Iy: 637200000,  Iz: 94650000,  It: 2500000,  Wpl_y: 3216000, Wel_y: 2896000 },
  "HEA 500": { h: 490, b: 300, tw: 12.0, tf: 23.0, r: 27, A: 19750, Iy: 869700000,  Iz: 103700000, It: 3180000,  Wpl_y: 3949000, Wel_y: 3550000 },
  "HEA 550": { h: 540, b: 300, tw: 12.5, tf: 24.0, r: 27, A: 21180, Iy: 1119300000, Iz: 108200000, It: 3600000,  Wpl_y: 4622000, Wel_y: 4146000 },
  "HEA 600": { h: 590, b: 300, tw: 13.0, tf: 25.0, r: 27, A: 22650, Iy: 1412000000, Iz: 112500000, It: 4070000,  Wpl_y: 5350000, Wel_y: 4787000 },

  // ── HEB ──────────────────────────────────────────────────────────────
  // It values computed from section dimensions (thin-wall formula + root fillet correction)
  "HEB 100": { h: 100, b: 100, tw: 6.0,  tf: 10.0, r: 12, A: 2600,  Iy: 4495000,    Iz: 1675000,   It: 84500,    Wpl_y: 104200,  Wel_y: 89900  },
  "HEB 120": { h: 120, b: 120, tw: 6.5,  tf: 11.0, r: 12, A: 3400,  Iy: 8643000,    Iz: 3180000,   It: 127500,   Wpl_y: 165200,  Wel_y: 144100 },
  "HEB 140": { h: 140, b: 140, tw: 7.0,  tf: 12.0, r: 12, A: 4300,  Iy: 15090000,   Iz: 5500000,   It: 186600,   Wpl_y: 245400,  Wel_y: 215600 },
  "HEB 160": { h: 160, b: 160, tw: 8.0,  tf: 13.0, r: 15, A: 5430,  Iy: 24920000,   Iz: 8890000,   It: 286600,   Wpl_y: 353900,  Wel_y: 311500 },
  "HEB 180": { h: 180, b: 180, tw: 8.5,  tf: 14.0, r: 15, A: 6530,  Iy: 38310000,   Iz: 13630000,  It: 389800,   Wpl_y: 481400,  Wel_y: 425700 },
  "HEB 200": { h: 200, b: 200, tw: 9.0,  tf: 15.0, r: 18, A: 7808,  Iy: 56960000,   Iz: 20000000,  It: 552200,   Wpl_y: 642500,  Wel_y: 569600 },
  "HEB 220": { h: 220, b: 220, tw: 9.5,  tf: 16.0, r: 18, A: 9100,  Iy: 80910000,   Iz: 28430000,  It: 715400,   Wpl_y: 827000,  Wel_y: 735500 },
  "HEB 240": { h: 240, b: 240, tw: 10.0, tf: 17.0, r: 21, A: 10600, Iy: 112600000,  Iz: 39230000,  It: 967500,   Wpl_y: 1053000, Wel_y: 938300 },
  "HEB 260": { h: 260, b: 260, tw: 10.0, tf: 17.5, r: 24, A: 11840, Iy: 149200000,  Iz: 51430000,  It: 1196400,  Wpl_y: 1282000, Wel_y: 1148000 },
  "HEB 280": { h: 280, b: 280, tw: 10.5, tf: 18.0, r: 24, A: 13140, Iy: 192700000,  Iz: 65950000,  It: 1375200,  Wpl_y: 1534000, Wel_y: 1376000 },
  "HEB 300": { h: 300, b: 300, tw: 11.0, tf: 19.0, r: 27, A: 14908, Iy: 251700000,  Iz: 85630000,  It: 1796300,  Wpl_y: 1869000, Wel_y: 1678000 },
  "HEB 320": { h: 320, b: 300, tw: 11.5, tf: 20.5, r: 27, A: 16130, Iy: 308200000,  Iz: 92390000,  It: 2172700,  Wpl_y: 2149000, Wel_y: 1926000 },
  "HEB 340": { h: 340, b: 300, tw: 12.0, tf: 21.5, r: 27, A: 17090, Iy: 366600000,  Iz: 96900000,  It: 2467000,  Wpl_y: 2408000, Wel_y: 2156000 },
  "HEB 360": { h: 360, b: 300, tw: 12.5, tf: 22.5, r: 27, A: 18060, Iy: 431900000,  Iz: 101400000, It: 2791400,  Wpl_y: 2682000, Wel_y: 2400000 },
  "HEB 400": { h: 400, b: 300, tw: 13.5, tf: 24.0, r: 27, A: 19780, Iy: 576800000,  Iz: 108200000, It: 3361700,  Wpl_y: 3231000, Wel_y: 2884000 },
  "HEB 450": { h: 450, b: 300, tw: 14.0, tf: 26.0, r: 27, A: 21800, Iy: 798900000,  Iz: 117200000, It: 4187500,  Wpl_y: 3982000, Wel_y: 3551000 },
  "HEB 500": { h: 500, b: 300, tw: 14.5, tf: 28.0, r: 27, A: 23860, Iy: 1072000000, Iz: 126200000, It: 5149800,  Wpl_y: 4815000, Wel_y: 4287000 },
  "HEB 550": { h: 550, b: 300, tw: 15.0, tf: 29.0, r: 27, A: 25410, Iy: 1367000000, Iz: 130800000, It: 5739500,  Wpl_y: 5591000, Wel_y: 4971000 },
  "HEB 600": { h: 600, b: 300, tw: 15.5, tf: 30.0, r: 27, A: 27000, Iy: 1710000000, Iz: 135300000, It: 6378500,  Wpl_y: 6425000, Wel_y: 5700000 },
};

// Steel grades per EN 10025
export const STEEL_GRADES: Record<string, SteelGradeProps> = {
  S235: { fy: 235, fu: 360 },
  S275: { fy: 275, fu: 430 },
  S355: { fy: 355, fu: 510 },
  S460: { fy: 460, fu: 540 },
};

// Material constants (EN 1993-1-1)
export const E_STEEL = 210000; // Modulus of elasticity (MPa)
export const G_STEEL = 81000;  // Shear modulus (MPa)
export const GAMMA_M0 = 1.0; // Partial safety factor for cross-section resistance (§6.1)
