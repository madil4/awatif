#!/usr/bin/env python3
"""Compile assets/tokens.json into assets/tokens.css.

tokens.json is the single source of truth. Run this after changing it:
    python scripts/build_tokens_css.py

Output layout: @font-face, a light-theme block (also :root), a dark-theme block
of overrides, spacing/radius/layout/font variables, and one class per type style.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "tokens.json")
OUT = os.path.join(ROOT, "assets", "tokens.css")


def css_value(v):
    """Turn an alias like "{accent}" into var(--accent); pass other values through."""
    m = re.fullmatch(r"\{([A-Za-z0-9_.-]+)\}", v)
    return f"var(--{m.group(1)})" if m else v


def per_theme(value, theme, first):
    if isinstance(value, dict):
        return value.get(theme, value.get(first))
    return value  # plain string: same in every theme


def main():
    t = json.load(open(SRC, encoding="utf-8"))
    themes = [x["id"] for x in t["color"]["themes"]]
    first = themes[0]
    out = [f"/* {t['name']} - generated from tokens.json by scripts/build_tokens_css.py. Do not edit by hand. */"]

    # fonts
    for f in t["type"]["fonts"]:
        file = f["file"] if "/" in f["file"] else "fonts/" + f["file"]
        out.append(
            f'@font-face {{ font-family: "{f["family"]}"; src: url("{file}") format("woff2"); '
            f'font-weight: {f["weight"]}; font-style: {f.get("style", "normal")}; font-display: swap; }}'
        )

    themed = list(t["color"]["tokens"]) + list(t.get("shadow", {}).get("tokens", []))

    # first theme: :root plus its data-theme selector
    lines = [f"  --{x['name']}: {css_value(per_theme(x['value'], first, first))};" for x in themed]
    out.append(f':root, [data-theme="{first}"] {{\n' + "\n".join(lines) + "\n}")

    # further themes: only what differs, plus aliases re-declared so they follow the theme
    for th in themes[1:]:
        lines = []
        for x in themed:
            v = x["value"]
            if isinstance(v, dict) and th in v:
                lines.append(f"  --{x['name']}: {css_value(v[th])};")
            elif isinstance(v, str) and v.startswith("{"):
                lines.append(f"  --{x['name']}: {css_value(v)};")
        out.append(f'[data-theme="{th}"] {{\n' + "\n".join(lines) + "\n}")

    # single-valued families
    flat = []
    for fam in ("spacing", "radius", "layout"):
        for x in t.get(fam, {}).get("tokens", []):
            flat.append(f"  --{x['name']}: {x['value']};")
    for key, stack in t["type"]["families"].items():
        flat.append(f"  --font-{key}: {stack};")
    out.append(":root {\n" + "\n".join(flat) + "\n}")

    # type styles as classes
    for g in t["type"]["groups"]:
        for s in g["styles"]:
            fam = s.get("family", g["family"])
            props = [f"font-family: var(--font-{fam})", f"font-size: {s['fontSize']}"]
            if "lineHeight" in s:
                props.append(f"line-height: {s['lineHeight']}")
            if "fontWeight" in s:
                props.append(f"font-weight: {s['fontWeight']}")
            if "letterSpacing" in s:
                props.append(f"letter-spacing: {s['letterSpacing']}")
            out.append(f".{s['name']} {{ " + "; ".join(props) + "; }")

    open(OUT, "w", encoding="utf-8").write("\n".join(out) + "\n")
    print(f"wrote {OUT} ({len(out)} blocks)")


if __name__ == "__main__":
    sys.exit(main())
