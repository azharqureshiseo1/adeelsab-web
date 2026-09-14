import { MAP_BOUNDS, MAP_VIEWBOX } from '@/content/pakistan-outline';

/**
 * Projects a latitude/longitude onto the coverage map's coordinate space.
 *
 * Must stay in step with scripts/generate-coverage-map.py — the outline and the
 * city pins are only aligned because both use this same spherical Mercator
 * transform and the same bounds.
 */
export function projectToMap(lat: number, lon: number): { x: number; y: number } {
  const x = (lon * Math.PI) / 180;
  const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

  return {
    x: ((x - MAP_BOUNDS.xMin) / (MAP_BOUNDS.xMax - MAP_BOUNDS.xMin)) * MAP_VIEWBOX.width,
    y: ((MAP_BOUNDS.yMax - y) / (MAP_BOUNDS.yMax - MAP_BOUNDS.yMin)) * MAP_VIEWBOX.height,
  };
}
