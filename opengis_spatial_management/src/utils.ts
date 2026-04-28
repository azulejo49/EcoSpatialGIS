import { SpatialFeature } from './types';
import L from 'leaflet';

export const calculateDistanceKm = (coords: [number, number][], isLoop = false): number => {
  if (coords.length < 2) return 0;
  let totalDataMeters = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    // Notice Leaflet distanceTo expects lat, lng
    // coords is [lng, lat] (GeoJSON format)
    totalDataMeters += L.latLng(p1[1], p1[0]).distanceTo(L.latLng(p2[1], p2[0]));
  }
  if (isLoop) {
    if (coords.length === 2) {
      totalDataMeters *= 2; // Two points loop is just there and back
    } else if (coords.length > 2) {
      const p1 = coords[coords.length - 1];
      const p2 = coords[0];
      totalDataMeters += L.latLng(p1[1], p1[0]).distanceTo(L.latLng(p2[1], p2[0]));
    }
  }
  return totalDataMeters / 1000;
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string | undefined> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const data = await response.json();
    if (data && data.address) {
      return data.address.city || data.address.town || data.address.village || data.address.county || data.name || 'Unknown Location';
    }
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
  }
  return undefined;
};

/**
 * Converts internal SpatialFeature representation to standard GeoJSON FeatureCollection
 */
export const exportToGeoJSON = (features: SpatialFeature[]) => {
  const geojson = {
    type: 'FeatureCollection',
    features: features.map((feature) => ({
      type: 'Feature',
      geometry: {
        type: feature.type,
        coordinates: feature.coordinates,
      },
      properties: feature.properties,
      id: feature.id,
    })),
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(geojson, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'spatial_data_export.geojson');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
