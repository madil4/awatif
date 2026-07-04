import { afterEach, describe, expect, test, vi } from "vitest";
import type { Mesh } from "../../data-model";
import { getNlPositionsAndForcesRemote } from "./getNlPositionsAndForcesRemote";

const NL_SOLVE_ENDPOINT =
  "https://phdoimejezjrvplwdcnb.supabase.co/functions/v1/nl-solve";

describe("getNlPositionsAndForcesRemote", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("posts a fixed-support-expanded solve request and returns mapped results", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        positions: [0, 0, 0, 0.1, 0, 2.9],
        internalForces: [
          [
            0,
            {
              N: [1, 2],
              Vy: [3, 4],
              Vz: [5, 6],
              Mx: [7, 8],
              My: [9, 10],
              Mz: [11, 12],
            },
          ],
        ],
        iterationCount: 4,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const nodes: Mesh["nodes"]["val"] = [
      [0, 0, 0],
      [0, 0, 3],
    ];
    const elements: Mesh["elements"]["val"] = [[0, 1]];
    const loads: Mesh["loads"]["val"] = new Map([
      [1, [10, 0, -2000, 0, 0, 0]],
    ]);
    const supports: Mesh["supports"]["val"] = new Map([
      [0, [true, true, true, true, true, true]],
    ]);
    const elementsProps: Mesh["elementsProps"]["val"] = new Map([
      [
        0,
        {
          elasticity: 32_836_000,
          area: 0.0625,
          momentInertiaZ: 0.00032552,
          momentInertiaY: 0.00032552,
          shearModulus: 0,
          torsionalConstant: 0,
        },
      ],
    ]);

    const result = await getNlPositionsAndForcesRemote(
      nodes,
      elements,
      loads,
      supports,
      elementsProps,
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(NL_SOLVE_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });

    const body = JSON.parse(init.body as string);
    expect(body).toEqual({
      nodes: [
        [0, 0, 0],
        [0, 0, 3],
        [0, 0, -0.01],
      ],
      elements: [
        [0, 1],
        [0, 2],
      ],
      loads: [[1, [10, 0, -2000, 0, 0, 0]]],
      supports: [
        [0, [true, true, true, true, true, true]],
        [2, [true, true, true, true, true, true]],
      ],
      elementsProps: [
        [
          0,
          {
            elasticity: 32_836_000,
            area: 0.0625,
            momentInertiaZ: 0.00032552,
            momentInertiaY: 0.00032552,
            shearModulus: 0,
            torsionalConstant: 0,
          },
        ],
        [
          1,
          {
            elasticity: 32_836_000,
            area: 0.0625,
            momentInertiaZ: 0.00032552,
            momentInertiaY: 0.00032552,
            shearModulus: 0,
            torsionalConstant: 0,
          },
        ],
      ],
      releases: [],
      simSettings: { tol: 1e-3, maximum_iter: 1000 },
      originalNodeCount: 2,
      originalElementCount: 1,
    });

    expect(result.positions).toEqual([0, 0, 0, 0.1, 0, 2.9]);
    expect(result.iterationCount).toBe(4);
    expect(result.internalForces).toBeInstanceOf(Map);
    expect(result.internalForces.get(0)).toEqual({
      N: [1, 2],
      Vy: [3, 4],
      Vz: [5, 6],
      Mx: [7, 8],
      My: [9, 10],
      Mz: [11, 12],
    });
  });

  test("throws JSON error messages from failed responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ error: "Solver did not converge" }, { status: 422 }),
      ),
    );

    await expect(callWithMinimalModel()).rejects.toThrow(
      "Solver did not converge",
    );
  });

  test("throws text error messages from failed responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Plain failure", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        }),
      ),
    );

    await expect(callWithMinimalModel()).rejects.toThrow("Plain failure");
  });

  test("throws when a successful response has no JSON data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 200 })),
    );

    await expect(callWithMinimalModel()).rejects.toThrow(
      "Nonlinear solver returned no data.",
    );
  });
});

function callWithMinimalModel() {
  return getNlPositionsAndForcesRemote(
    [
      [0, 0, 0],
      [0, 0, 1],
    ],
    [[0, 1]],
    new Map(),
    new Map([[0, [true, true, true, true, true, true]]]),
    new Map([
      [
        0,
        {
          elasticity: 1,
          area: 1,
          momentInertiaZ: 1,
          momentInertiaY: 1,
          shearModulus: 0,
          torsionalConstant: 0,
        },
      ],
    ]),
  );
}

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
}
