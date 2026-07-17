import type { Mesh } from "../../data-model";

const NL_SOLVE_ENDPOINT = "https://awatif.co/api/solve";

type MapEntry<T> = [number, T];

export type SimSettings = {
  tol: number;
  maximum_iter: number;
};

type RemoteInternalForce = {
  N: [number, number];
  Vy: [number, number];
  Vz: [number, number];
  Mx: [number, number];
  My: [number, number];
  Mz: [number, number];
};

type RemoteNlSolveResponse = {
  positions: number[];
  internalForces: MapEntry<RemoteInternalForce>[];
  iterationCount: number;
};

export async function getNlPositionsAndForcesRemote(
  nodes: Mesh["nodes"]["val"],
  elements: Mesh["elements"]["val"],
  loads: Mesh["loads"]["val"],
  supports: Mesh["supports"]["val"],
  elementsProps: Mesh["elementsProps"]["val"],
  releases?: Mesh["releases"]["val"],
  simSettings: SimSettings = {
    tol: 1e-3,
    maximum_iter: 1000,
  },
): Promise<{
  positions: number[];
  internalForces: Mesh["internalForces"]["val"];
  iterationCount: number;
}> {
  if (!nodes || nodes.length === 0) {
    throw new Error("Nodes array is null, undefined or empty");
  }

  const response = await fetch(NL_SOLVE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nodes,
      elements,
      loads: mapToEntries(loads),
      supports: mapToEntries(supports),
      elementsProps: mapToEntries(elementsProps),
      releases: mapToEntries(releases),
      simSettings,
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = await readJson<RemoteNlSolveResponse>(response);
  if (!data) {
    throw new Error("Nonlinear solver returned no data.");
  }

  return {
    positions: data.positions,
    internalForces: new Map(data.internalForces),
    iterationCount: data.iterationCount,
  };
}

function mapToEntries<T>(map: Map<number, T> | undefined): MapEntry<T>[] {
  return map ? Array.from(map.entries()) : [];
}

async function readErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("Content-Type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const body = await response.json();
      if (typeof body?.error === "string") return body.error;
      return JSON.stringify(body);
    }

    const text = await response.text();
    return text || response.statusText;
  } catch {
    return response.statusText || `Request failed with status ${response.status}`;
  }
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
