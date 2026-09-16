// ========================================================================
// MAPS & GEOSPATIAL CONFIGURATION
// Geoapify API Key & Tile URL Generators
// ========================================================================

export const GEOAPIFY_API_KEY = '902811b7b7bc9b357b90f2204de33e55';

export type GeoapifyMapStyle = 'osm-bright-smooth' | 'positron' | 'osm-carto';

export const getGeoapifyTileUrl = (style: GeoapifyMapStyle = 'osm-bright-smooth'): string => {
  return `https://maps.geoapify.com/v1/tile/${style}/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`;
};

export const GEOAPIFY_ATTRIBUTION =
  '&copy; <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">Geoapify</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';
