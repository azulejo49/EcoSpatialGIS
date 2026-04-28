export type ToolMode = 'pan' | 'add-marker' | 'record-wildlife' | 'cycle-route';

export interface SpatialFeature {
  id: string;
  type: 'Point' | 'LineString';
  coordinates: any; // [number, number] for Point, [number, number][] for LineString
  properties: {
    name: string;
    description?: string;
    createdAt: string;
    locationName?: string;
    recordType?: 'generic' | 'wildlife' | 'route';
    // wildlife
    species?: string;
    category?: 'Mammal' | 'Bird' | 'Reptile/Amphibian' | 'Fish' | 'Insect/Invertebrate' | 'Plant' | 'Fungi';
    observer?: string;
    dateObserved?: string;
    image?: string; // base64 compressed
    // route
    distanceKm?: number;
    estimatedMin?: number;
    routeType?: 'one-way' | 'loop';
  };
}

export type BaseLayer = 'osm' | 'topo' | 'satellite';

export const BASE_LAYERS: Record<BaseLayer, { name: string; url: string; attribution: string }> = {
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  topo: {
    name: 'Topography',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
  },
  satellite: {
    name: 'Satellite (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
};
