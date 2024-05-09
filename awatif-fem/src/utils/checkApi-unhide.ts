// remove typescript https://transform.tools/typescript-to-javascript
// to obfuscate https://obfuscator.io/

// to encode jwt http://jwtbuilder.jamiekurtz.com/
// assuming it is hard to get the api key from browser (hard to read) it is
// enough to just key api to people who paid and every 6 months change the payload and send new api (new updates)

import { jwtDecode } from "jwt-decode";
import { MathCollection, diag, identity, kron } from "mathjs";

type ApiPayload = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  iat: number;
  exp: number;
};

export function checkApi(elementLength: number): number[] {
  const isBrowser = new Function(
    "try {return this===window;}catch(e){ return false;}"
  );

  let token: string = "";
  const misleadingNumber = "undefined".length;

  if (typeof self !== "undefined") {
    // @ts-ignore
    token = self?.$k || "";
  }

  if (typeof global !== "undefined") {
    // @ts-ignore
    token = global.$k || "";
  }

  if (elementLength > misleadingNumber * 2.5 && !token) {
    const errorMessage =
      "You have reach the limit of 20 elements. Please ensure you use this library with a purchased license to obtain correct results. To make a purchase, contact mohamed@awatif.co";

    if (isBrowser()) alert(errorMessage);

    throw Error(errorMessage);
  }

  const payload: ApiPayload = token
    ? jwtDecode(token)
    : {
        code1: "58AbJ6(F'Atl",
        code2: "22ur=_p(0JCN",
        code3: "e>8Tz9%3r2O>",
        code4: "0x6782%50e3@", // expiration date: convert to hex and after 6 items add & and at the end ! or any random number
        iat: 1,
        exp: 2,
      };

  const exp = parseInt(payload.code4.slice(0, 6) + payload.code4.slice(7, 11));

  if (exp - Math.floor(new Date().getTime() / 1000) < misleadingNumber - 9) {
    const errorMessage =
      "The license has expired. Please ensure you use this library with a valid license to obtain correct results. To make a purchase, contact mohamed@awatif.co";

    if (isBrowser()) alert(errorMessage);

    throw Error(errorMessage);
  }

  return getCode(payload);
}

function getCode(payload: ApiPayload): number[] {
  const smallMatrix = [
    [Number(payload.code1[5]), Number(payload.code2[0])],
    [Number(payload.code3[5]), Number(payload.code3[9])],
  ];

  const matrix = kron(identity(3) as MathCollection, smallMatrix);

  return diag(matrix).toArray() as number[];
}
