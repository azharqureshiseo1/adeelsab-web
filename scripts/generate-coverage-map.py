"""
Generates the Pakistan outline used by the coverage map.

Source: world-atlas (https://github.com/topojson/world-atlas), derived from
Natural Earth, which is **public domain**. The 50m resolution is used so
provincial-scale detail survives at the size the map renders.

Run:
    curl -s -o countries-50m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json
    python scripts/generate-coverage-map.py countries-50m.json

Writes content/pakistan-outline.ts. Nothing fetches at build or run time —
the outline is baked in as a plain string.

NOTE ON BORDERS: the Natural Earth polygon for Pakistan (ISO 586) spans to
37.04N and 77.05E, so Gilgit-Baltistan and Azad Kashmir are inside the shape.
That is the depiction a Pakistani company would expect. It is still worth a
human looking at the rendered result before launch.
"""

import json
import math
import sys
from pathlib import Path

PAKISTAN_ISO = "586"
VIEW_WIDTH = 100.0
# Douglas-Peucker tolerance in degrees. Small enough to keep the coastline and
# the northern salient readable, large enough to halve the point count.
SIMPLIFY_EPSILON = 0.03


def decode_arcs(topo: dict) -> list:
    """TopoJSON arcs are quantised and delta-encoded; undo both."""
    sx, sy = topo["transform"]["scale"]
    tx, ty = topo["transform"]["translate"]

    arcs = []
    for arc in topo["arcs"]:
        x = y = 0
        points = []
        for dx, dy in arc:
            x += dx
            y += dy
            points.append((x * sx + tx, y * sy + ty))
        arcs.append(points)
    return arcs


def stitch(indices, arcs) -> list:
    """Joins arc indices into a ring; a negative index means 'reversed'."""
    ring = []
    for i in indices:
        arc = arcs[~i][::-1] if i < 0 else arcs[i]
        ring.extend(arc if not ring else arc[1:])
    return ring


def perpendicular_distance(p, a, b) -> float:
    (px, py), (ax, ay), (bx, by) = p, a, b
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def simplify(points: list, epsilon: float) -> list:
    """Douglas-Peucker, iterative so a long coastline cannot blow the stack."""
    if len(points) < 3:
        return points

    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]

    while stack:
        start, end = stack.pop()
        worst, worst_i = 0.0, None
        for i in range(start + 1, end):
            d = perpendicular_distance(points[i], points[start], points[end])
            if d > worst:
                worst, worst_i = d, i
        if worst_i is not None and worst > epsilon:
            keep[worst_i] = True
            stack.append((start, worst_i))
            stack.append((worst_i, end))

    return [p for p, k in zip(points, keep) if k]


def mercator_x(lon: float) -> float:
    """Spherical Mercator x. Radians, to match mercator_y's units."""
    return math.radians(lon)


def mercator_y(lat: float) -> float:
    """Spherical Mercator y. Keeps the country's proportions honest."""
    return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


def main() -> None:
    source = Path(sys.argv[1] if len(sys.argv) > 1 else "countries-50m.json")
    topo = json.loads(source.read_text(encoding="utf-8"))
    arcs = decode_arcs(topo)

    country = next(
        g for g in topo["objects"]["countries"]["geometries"] if g.get("id") == PAKISTAN_ISO
    )
    rings = [stitch(r, arcs) for r in country["arcs"]]
    rings = [simplify(r, SIMPLIFY_EPSILON) for r in rings]

    lons = [x for r in rings for x, _ in r]
    lats = [y for r in rings for _, y in r]
    lon_min, lon_max = min(lons), max(lons)
    lat_min, lat_max = min(lats), max(lats)
    x_min, x_max = mercator_x(lon_min), mercator_x(lon_max)
    y_min, y_max = mercator_y(lat_min), mercator_y(lat_max)

    # Height follows from the projection, so the country is never stretched.
    view_height = round(VIEW_WIDTH * (y_max - y_min) / (x_max - x_min), 2)

    def project(lon: float, lat: float):
        x = (mercator_x(lon) - x_min) / (x_max - x_min) * VIEW_WIDTH
        y = (y_max - mercator_y(lat)) / (y_max - y_min) * view_height
        return round(x, 2), round(y, 2)

    parts = []
    for ring in rings:
        pts = [project(lon, lat) for lon, lat in ring]
        parts.append("M" + "L".join(f"{x},{y}" for x, y in pts) + "Z")
    path = "".join(parts)

    out = Path("content/pakistan-outline.ts")
    out.write_text(
        f'''/* eslint-disable */
/**
 * GENERATED FILE - do not edit by hand.
 * Run: python scripts/generate-coverage-map.py countries-50m.json
 *
 * Pakistan outline derived from Natural Earth via world-atlas (public domain),
 * projected to spherical Mercator and fitted to the viewBox below.
 *
 * The polygon includes Gilgit-Baltistan and Azad Kashmir.
 */

/** Mercator-projected outline path, in the viewBox coordinate space. */
export const PAKISTAN_OUTLINE =
  '{path}';

export const MAP_VIEWBOX = {{ width: {VIEW_WIDTH}, height: {view_height} }};

/** Projection bounds, so city pins land on the same grid as the outline. */
export const MAP_BOUNDS = {{
  xMin: {x_min:.6f},
  xMax: {x_max:.6f},
  yMin: {y_min:.6f},
  yMax: {y_max:.6f},
}};
''',
        encoding="utf-8",
    )

    print(f"points: {sum(len(r) for r in rings)}")
    print(f"viewBox: 0 0 {VIEW_WIDTH} {view_height}")
    print(f"lon {lon_min:.2f}..{lon_max:.2f}  lat {lat_min:.2f}..{lat_max:.2f}")
    print(f"wrote {out} ({out.stat().st_size // 1024} KB)")

    for name, lat, lon in [("Lahore", 31.5204, 74.3587), ("Karachi", 24.8607, 67.0011),
                           ("Gilgit", 35.9208, 74.3144), ("Turbat", 26.0031, 63.0450)]:
        print(f"  {name:<8} -> {project(lon, lat)}")


if __name__ == "__main__":
    main()
