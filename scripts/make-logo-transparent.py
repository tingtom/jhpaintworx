#!/usr/bin/env python3
"""Make white background transparent: flood-fill from edges + feather.

Usage:
  python3 scripts/make-logo-transparent.py INPUT > public/logo.png
  python3 scripts/make-logo-transparent.py INPUT public/logo.png [--fuzz 18] [--feather 1]

INPUT can be PNG/JPG/WEBP. Output is RGBA PNG with transparency.
Requires: pip install pillow numpy
"""
import sys
from collections import deque

from PIL import Image
import numpy as np


def remove_white_bg(src: str, fuzz: int = 18, feather: int = 1) -> Image.Image:
    img = Image.open(src).convert("RGB")
    a = np.asarray(img).astype(np.int16)
    # Near-white mask
    white = (a[:, :, 0] > 255 - fuzz) & (a[:, :, 1] > 255 - fuzz) & (a[:, :, 2] > 255 - fuzz)

    h, w = white.shape
    # Flood fill background from all edge pixels (only through near-white)
    bg = np.zeros_like(white, dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if white[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if white[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and white[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                q.append((ny, nx))

    alpha = np.where(bg, 0, 255).astype(np.uint8)
    # Feather edges slightly to avoid halos
    if feather > 0:
        from PIL import ImageFilter
        m = Image.fromarray(alpha)
        m = m.filter(ImageFilter.GaussianBlur(feather))
        alpha = np.asarray(m)

    out = img.convert("RGBA")
    out.putalpha(Image.fromarray(alpha))
    # Trim fully-transparent border
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    return out


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    fuzz = 18
    feather = 1
    for a in sys.argv[1:]:
        if a.startswith("--fuzz="):
            fuzz = int(a.split("=", 1)[1])
        elif a.startswith("--feather="):
            feather = int(a.split("=", 1)[1])
    if not args:
        print(__doc__)
        sys.exit(1)
    out = remove_white_bg(args[0], fuzz=fuzz, feather=feather)
    if len(args) > 1:
        out.save(args[1])
        print(f"Saved {args[1]} ({out.width}x{out.height})")
    else:
        out.save(sys.stdout.buffer, format="PNG")


if __name__ == "__main__":
    main()
