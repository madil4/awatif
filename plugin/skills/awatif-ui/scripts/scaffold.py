#!/usr/bin/env python3
"""Create a starter viewer app that already follows the design system.

    python scripts/scaffold.py OUT --title "Portal frame"            # folder: index.html + linked assets
    python scripts/scaffold.py OUT.html --title "Portal frame" --single-file   # one self-contained HTML file

The starter lays out the six regions (toolbar, model tree, viewport, inspector, status bar), builds the tree
and inspector from an Awatif model with assets/awatif-ui.js, and mounts the required three.js viewport
(assets/awatif-viewer.js: orbit, pan, zoom, click-to-select shared with the tree). React 18.3.1 and
three 0.183.2 are loaded from jsDelivr, pinned, so the page needs network access to run.
"""
import argparse
import base64
import json
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "assets")
REACT = [
    "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js",
    "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js",
]
THREE_VERSION = "0.183.2"
IMPORT_MAP = (
    '<script type="importmap">{"imports": {'
    f'"three": "https://cdn.jsdelivr.net/npm/three@{THREE_VERSION}/build/three.module.js", '
    f'"three/addons/": "https://cdn.jsdelivr.net/npm/three@{THREE_VERSION}/examples/jsm/"'
    '}}</script>'
)


def read(*p):
    with open(os.path.join(A, *p), encoding="utf-8") as f:
        return f.read()


def b64(*p):
    with open(os.path.join(A, *p), "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")


def safe_script(js):
    """Inline scripts must not contain a closing script tag."""
    return re.sub(r"</(script)", r"<\\/\1", js, flags=re.I)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("out", help="output folder, or an .html path with --single-file")
    ap.add_argument("--title", default="Structural viewer")
    ap.add_argument("--single-file", action="store_true", help="inline CSS, JS, font and logo into one HTML file")
    args = ap.parse_args()

    tpl = read("starter.template.html")
    react_tags = "\n".join(f'<script src="{u}"></script>' for u in REACT)

    if args.single_file:
        font = "data:font/woff2;base64," + b64("fonts", "Nunito-Variable.woff2")
        tokens = read("tokens.css").replace("fonts/Nunito-Variable.woff2", font)
        head = "<style>\n" + tokens + "\n" + read("components", "bundle.css") + "\n</style>"
        scripts = react_tags + "\n<script>\n" + safe_script(read("components", "bundle.js")) + "\n</script>\n<script>\n" + safe_script(read("awatif-ui.js")) + "\n</script>"
        viewer = '<script type="module">\n' + safe_script(read("awatif-viewer.js")) + "\n</script>"
        logo = "data:image/svg+xml;base64," + b64("logo.svg")
        out_file = args.out if args.out.endswith(".html") else os.path.join(args.out, "index.html")
        os.makedirs(os.path.dirname(os.path.abspath(out_file)), exist_ok=True)
    else:
        out_dir = args.out
        os.makedirs(os.path.join(out_dir, "fonts"), exist_ok=True)
        os.makedirs(os.path.join(out_dir, "components"), exist_ok=True)
        shutil.copy(os.path.join(A, "tokens.css"), out_dir)
        shutil.copy(os.path.join(A, "logo.svg"), out_dir)
        shutil.copy(os.path.join(A, "awatif-ui.js"), out_dir)
        shutil.copy(os.path.join(A, "awatif-viewer.js"), out_dir)
        shutil.copy(os.path.join(A, "fonts", "Nunito-Variable.woff2"), os.path.join(out_dir, "fonts"))
        for f in ("bundle.js", "bundle.css"):
            shutil.copy(os.path.join(A, "components", f), os.path.join(out_dir, "components"))
        head = '<link rel="stylesheet" href="tokens.css">\n<link rel="stylesheet" href="components/bundle.css">'
        scripts = react_tags + '\n<script src="components/bundle.js"></script>\n<script src="awatif-ui.js"></script>'
        viewer = '<script type="module" src="awatif-viewer.js"></script>'
        logo = "logo.svg"
        out_file = os.path.join(out_dir, "index.html")

    html = (tpl.replace("{{IMPORT_MAP}}", IMPORT_MAP).replace("{{VIEWER_SCRIPT}}", viewer)
            .replace("{{HEAD_ASSETS}}", head).replace("{{BODY_SCRIPTS}}", scripts)
            .replace("{{TITLE_JSON}}", json.dumps(args.title)).replace("{{LOGO_SRC}}", logo)
            .replace("{{TITLE}}", args.title.replace("<", "&lt;")))
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"wrote {out_file}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
