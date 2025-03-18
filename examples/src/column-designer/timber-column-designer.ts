import van from "vanjs-core";
import { Glulam } from "./utils";

// Define a type for support conditions
export type SupportType =
  | "pinned"
  | "cantilever"
  | "fixed (top)"
  | "fixed (bottom)";

// Interface to hold the results of the column design

export interface EntryParams {
  column: string;
  support: number;
  grade: Glulam;
  kmod: number;
  gamma: number;
  chi: number;
}

export interface Loads {
  N_ed: number;
  M_yd: number;
  M_zd: number;
}

export interface Geometry {
  length: number;
  width: number;
  height: number;
}

export interface GeometryProperties {
  l_ef: number;
  area: number;
  w_ply: number;
  w_plz: number;
  I_y: number;
  I_z: number;
  i_y: number;
  i_z: number;
}

export interface Resistance {
  f_c0k: number;
  f_myk: number;
  f_mzk: number;
  f_c0d: number;
  f_myd: number;
  f_mzd: number;
}

export interface ColumnDesignInput {
  entryParams: EntryParams;
  geometry: Geometry;
  loads: Loads;
}

export interface ColumnDesignOutput {
  entryParams: EntryParams;
  loads: Loads;
  geometry: Geometry;
  geometryProperties: GeometryProperties;
  resistance: Resistance;
  compressionCheckResult: CompressionCheckResult;
}


// Function for timber column design
export function timberColumnDesign(
  input: ColumnDesignInput
): ColumnDesignOutput {
  
  const { entryParams, loads, geometry } = input;

  // Geometry: Convert to mm (1m = 1000mm)
  const widthh = geometry.width * 1000; // Width in mm
  const heightt = geometry.height * 1000; // Height in mm
  const area = widthh * heightt; // Cross-sectional area in mm²

  // Section moduli and moments of inertia
  const w_ply = (widthh * Math.pow(heightt, 2)) / 6; // Section modulus around y-axis
  const w_plz = (heightt * Math.pow(widthh, 2)) / 6; // Section modulus around z-axis
  const I_y = (widthh * Math.pow(heightt, 3)) / 12; // Moment of inertia around y-axis
  const I_z = (heightt * Math.pow(widthh, 3)) / 12; // Moment of inertia around z-axis
  const i_y = heightt / Math.sqrt(12); // Radius of gyration around y-axis
  const i_z = widthh / Math.sqrt(12); // Radius of gyration around z-axis

  // Effective length coefficient based on support type
  const betaValues: { [key in SupportType]: number } = {
    "pinned": 1,
    "cantilever": 2,
    "fixed (top)": 0.7,
    "fixed (bottom)": 0.7,
  };
  const beta = betaValues[entryParams.support]; // Support-based coefficient
  const l_ef = geometry.length * beta; // Effective length of the column

  var geometryProperties: GeometryProperties = {
    l_ef: l_ef,
    area: area,
    w_ply: w_ply,
    w_plz: w_plz,
    I_y: I_y,
    I_z: I_z,
    i_y: i_y,
    i_z: i_z,
  };

  // Material properties from the grade
  const f_c0k = entryParams.grade.f_c0k;
  const f_myk = entryParams.grade.f_mk;
  const f_mzk = entryParams.grade.f_mk;

  // Adjusted material strengths
  const f_c0d = f_c0k * entryParams.chi;
  const f_myd = f_myk * entryParams.chi;
  const f_mzd = f_mzk * entryParams.chi;

  var resistance: Resistance = {
    f_c0k: f_c0k,
    f_myk: f_myk,
    f_mzk: f_mzk,
    f_c0d: f_c0d,
    f_myd: f_myd,
    f_mzd: f_mzd,
  };

  // Clause 6.1.4 Compression parallel to the grain
  var inputCompressionCheckInput: CompressionCheckInput = {
    loads: loads,
    geometryProperties: geometryProperties,
    resistance: resistance,
  };

  const compressionCheckResult = checkCompressionParallelToGrain(
    inputCompressionCheckInput
  );

  // Return the column design results
  const columnDesignOutput: ColumnDesignOutput = {
    entryParams: entryParams,
    loads: loads,
    geometry: geometry,
    geometryProperties: geometryProperties,
    resistance: resistance,
    compressionCheckResult: compressionCheckResult,
  };

  return columnDesignOutput
}


// Clause 6.1.4 Compression parallel to the grain
type CompressionCheckInput = {
  loads: Loads;
  geometryProperties: GeometryProperties;
  resistance: Resistance;
};

type CompressionCheckResult = {
  sigma_c0d: number;
  etaCheckCompressionParallelToGrain: number; // Utilization ratio (sigma_c0d / f_c0d)
};

function checkCompressionParallelToGrain(
  input: CompressionCheckInput
): CompressionCheckResult {
  const { loads, geometryProperties, resistance } = input;

  // Calculate the design compressive stress
  const sigma_c0d = (loads.N_ed * 1000) / geometryProperties.area;

  // Calculate the utilization ratio (eta)
  const etaCheckCompressionParallelToGrain = sigma_c0d / resistance.f_c0d;

  return {
    sigma_c0d,
    etaCheckCompressionParallelToGrain,
  };
}
