// @ts-nocheck
(function (_0x2bd880, _0x4787fb) {
  const _0x1a5916 = _0x2fa6,
    _0x2593b4 = _0x2bd880();
  while (!![]) {
    try {
      const _0x4a5874 =
        -parseInt(_0x1a5916(0x124)) / 0x1 +
        (parseInt(_0x1a5916(0x125)) / 0x2) *
          (parseInt(_0x1a5916(0x131)) / 0x3) +
        -parseInt(_0x1a5916(0x128)) / 0x4 +
        (parseInt(_0x1a5916(0x12d)) / 0x5) *
          (-parseInt(_0x1a5916(0x126)) / 0x6) +
        (-parseInt(_0x1a5916(0x123)) / 0x7) *
          (parseInt(_0x1a5916(0x137)) / 0x8) +
        (-parseInt(_0x1a5916(0x12a)) / 0x9) *
          (parseInt(_0x1a5916(0x13b)) / 0xa) +
        parseInt(_0x1a5916(0x12b)) / 0xb;
      if (_0x4a5874 === _0x4787fb) break;
      else _0x2593b4["push"](_0x2593b4["shift"]());
    } catch (_0x4153b4) {
      _0x2593b4["push"](_0x2593b4["shift"]());
    }
  }
})(_0x4408, 0xe2034);
import { jwtDecode } from "jwt-decode";
import { diag, identity, kron } from "mathjs";
function _0x4408() {
  const _0x3ae7c2 = [
    "The\x20license\x20has\x20expired.\x20Please\x20ensure\x20you\x20use\x20this\x20library\x20with\x20a\x20valid\x20license\x20to\x20obtain\x20correct\x20results.\x20To\x20make\x20a\x20purchase,\x20contact\x20mohamed@awatif.co",
    "6631208ivzNOE",
    "floor",
    "23994jhWaCN",
    "59998818xZomkD",
    "code1",
    "10RMDSXO",
    "code3",
    "toArray",
    "try\x20{return\x20this===window;}catch(e){\x20return\x20false;}",
    "1231647YHWkVv",
    "code4",
    "You\x20have\x20reach\x20the\x20limit\x20of\x2020\x20elements.\x20Please\x20ensure\x20you\x20use\x20this\x20library\x20with\x20a\x20purchased\x20license\x20to\x20obtain\x20correct\x20results.\x20To\x20make\x20a\x20purchase,\x20contact\x20mohamed@awatif.co",
    "22ur=_p(0JCN",
    "e>8Tz9%3r2O>",
    "code2",
    "1849360pYSnrW",
    "length",
    "undefined",
    "slice",
    "4740pzqUcj",
    "49yWdOxm",
    "398583EDoBPM",
    "6LpDUsD",
    "2466234rKHqla",
  ];
  _0x4408 = function () {
    return _0x3ae7c2;
  };
  return _0x4408();
}
export function checkApi(_0x8f74ca) {
  const _0x4d5be6 = _0x2fa6,
    _0x2c2016 = new Function(_0x4d5be6(0x130));
  let _0xa87bf8 = "";
  const _0x38f66a = "undefined"[_0x4d5be6(0x138)];
  typeof self !== _0x4d5be6(0x139) && (_0xa87bf8 = self?.["$k"] || "");
  typeof global !== _0x4d5be6(0x139) && (_0xa87bf8 = global["$k"] || "");
  if (_0x8f74ca > _0x38f66a * 2.5 && !_0xa87bf8) {
    const _0x1db948 = _0x4d5be6(0x133);
    if (_0x2c2016()) alert(_0x1db948);
    throw Error(_0x1db948);
  }
  const _0x3e2693 = _0xa87bf8
      ? jwtDecode(_0xa87bf8)
      : {
          code1: "58AbJ6(F\x27Atl",
          code2: _0x4d5be6(0x134),
          code3: _0x4d5be6(0x135),
          code4: "0x6782%50e3@",
          iat: 0x1,
          exp: 0x2,
        },
    _0x121a36 = parseInt(
      _0x3e2693[_0x4d5be6(0x132)][_0x4d5be6(0x13a)](0x0, 0x6) +
        _0x3e2693[_0x4d5be6(0x132)][_0x4d5be6(0x13a)](0x7, 0xb)
    );
  if (
    _0x121a36 - Math[_0x4d5be6(0x129)](new Date()["getTime"]() / 0x3e8) <
    _0x38f66a - 0x9
  ) {
    const _0x45c5c1 = _0x4d5be6(0x127);
    if (_0x2c2016()) alert(_0x45c5c1);
    throw Error(_0x45c5c1);
  }
  return getCode(_0x3e2693);
}
function _0x2fa6(_0x26ad9e, _0x193f9d) {
  const _0x44080d = _0x4408();
  return (
    (_0x2fa6 = function (_0x2fa61c, _0x5effa3) {
      _0x2fa61c = _0x2fa61c - 0x123;
      let _0x5d7c85 = _0x44080d[_0x2fa61c];
      return _0x5d7c85;
    }),
    _0x2fa6(_0x26ad9e, _0x193f9d)
  );
}
function getCode(_0x5d68a8) {
  const _0x1e1d97 = _0x2fa6,
    _0x2f086e = [
      [
        Number(_0x5d68a8[_0x1e1d97(0x12c)][0x5]),
        Number(_0x5d68a8[_0x1e1d97(0x136)][0x0]),
      ],
      [
        Number(_0x5d68a8[_0x1e1d97(0x12e)][0x5]),
        Number(_0x5d68a8[_0x1e1d97(0x12e)][0x9]),
      ],
    ],
    _0x176028 = kron(identity(0x3), _0x2f086e);
  return diag(_0x176028)[_0x1e1d97(0x12f)]();
}
