import { checkApi } from "./checkApi";

export const awatifApiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2RlMSI6IjU4QWJKNihGJ0F0bCIsImNvZGUyIjoiMjJ1cj1fcCgwSkNOIiwiY29kZTMiOiJlPjhUejklM3IyTz4iLCJjb2RlNCI6IjB4Njc4MiU1MGUzQCIsImlhdCI6MTcwMzk2NjE5OCwiZXhwIjoxNzAzMTAyMTk3fQ.rREW6gtPWrrGsHyCcBelagCeRmgo1LX0dWyJqo3GCa8";
const expiredKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2RlMSI6IjU4QWJKNihGJ0F0bCIsImNvZGUyIjoiMjJ1cj1fcCgwSkNOIiwiY29kZTMiOiJlPjhUejklM3IyTz4iLCJjb2RlNCI6IjB4NjU4MyU0NmY1ISIsImlhdCI6MTcwMzk2NjE5OCwiZXhwIjoxNzAzMTAyMTk3fQ.ix747gho782WiwI7MDrlMS0fj7nVP1Ocw1yV4B9BeCs";

describe("checkApi", () => {
  beforeEach(() => {
    // @ts-ignore
    global.$k = undefined;
  });

  test("should throw without api-key and with elements more than 20", () => {
    expect(() => checkApi(25)).toThrow(
      "You have reach the limit of 20 elements. Please ensure you use this library with a purchased license to obtain correct results. To make a purchase, contact mohamed@awatif.co"
    );
  });

  test("should return code without api-key and with element less than 20", () => {
    expect(checkApi(10)).toEqual([6, 2, 6, 2, 6, 2]);
  });

  test("should throw with invalid api-key ", () => {
    // @ts-ignore
    global.$k = "invalid api-key";

    expect(() => checkApi(10)).toThrow("Invalid token specified");
  });

  test("should throw with an expired api-key ", () => {
    // @ts-ignore
    global.$k = expiredKey;

    expect(() => checkApi(10)).toThrow(
      "The license has expired. Please ensure you use this library with a valid license to obtain correct results. To make a purchase, contact mohamed@awatif.co"
    );
  });

  test("should return code with valid api-key", () => {
    // @ts-ignore
    global.$k = awatifApiKey;

    expect(checkApi(10)).toEqual([6, 2, 6, 2, 6, 2]);
    expect(checkApi(25)).toEqual([6, 2, 6, 2, 6, 2]);
  });
});
