import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { BaseLayer, BASE_LAYERS, SpatialFeature, ToolMode } from '../types';
import { MapPin, Leaf, Bike } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default Leaflet marker icons not loading correctly in module environments
const iconMarkup = renderToStaticMarkup(
  <div className="text-sky-500 drop-shadow-md">
    <MapPin className="w-8 h-8 fill-sky-100" strokeWidth={1.5} />
  </div>
);

const customDivIcon = L.divIcon({
  html: iconMarkup,
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const wildlifeIconMarkup = renderToStaticMarkup(
  <div className="text-emerald-500 drop-shadow-md">
    <Leaf className="w-7 h-7 fill-emerald-100" strokeWidth={1.5} />
  </div>
);

const customWildlifeIcon = L.divIcon({
  html: wildlifeIconMarkup,
  className: 'custom-leaflet-icon',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

interface MapViewProps {
  features: SpatialFeature[];
  baseLayer: BaseLayer;
  toolMode: ToolMode;
  onMapClick: (coordinates: [number, number]) => void;
  mapCenter: [number, number];
  mapZoom: number;
  activeRoute?: [number, number][];
}

// Helper component to bind map events
function MapEvents({ toolMode, onMapClick }: { toolMode: ToolMode; onMapClick: (coordinates: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      if (toolMode === 'add-marker' || toolMode === 'record-wildlife' || toolMode === 'cycle-route') {
        const { lat, lng } = e.latlng;
        onMapClick([lng, lat]); // GeoJSON expects [longitude, latitude]
      }
    },
  });
  return null;
}

// Helper component to update map view imperatively
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  
  return null;
}

export function MapView({ features, baseLayer, toolMode, onMapClick, mapCenter, mapZoom, activeRoute }: MapViewProps) {
  const layerConfig = BASE_LAYERS[baseLayer];

  const getCursorMode = () => {
    if (toolMode === 'add-marker' || toolMode === 'record-wildlife' || toolMode === 'cycle-route') return 'cursor-crosshair';
    return 'cursor-grab';
  };

  return (
    <div className={`flex-1 h-full relative z-10 ${getCursorMode()}`}>
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        className="w-full h-full"
        zoomControl={true}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          key={baseLayer}
          attribution={layerConfig.attribution}
          url={layerConfig.url}
          maxZoom={19}
        />

        <MapEvents toolMode={toolMode} onMapClick={onMapClick} />

        {/* Render active cycle route being drawn */}
        {activeRoute && activeRoute.length > 0 && (
          <Polyline 
            positions={activeRoute.map(c => [c[1], c[0]] as [number, number])} 
            color="#f59e0b" // amber-500
            weight={4}
            dashArray="5, 10"
            lineCap="round"
          />
        )}
        {activeRoute && activeRoute.length > 0 && (
          <Marker 
            position={[activeRoute[activeRoute.length - 1][1], activeRoute[activeRoute.length - 1][0]] as [number, number]}
            icon={L.divIcon({ className: 'custom-leaflet-icon w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-md' })}
          />
        )}

        {features.map((feature, index) => {
          if (feature.type === 'LineString') {
            const coords = feature.coordinates as [number, number][];
            return (
              <React.Fragment key={feature.id}>
                <Polyline 
                  positions={coords.map(c => [c[1], c[0]])} 
                  color="#f59e0b" 
                  weight={5}
                />
                {/* Visual marker at the start of the route */}
                <Marker 
                  position={[coords[0][1], coords[0][0]]}
                  icon={L.divIcon({
                    html: renderToStaticMarkup(
                      <div className="relative">
                        <div className="text-amber-500 bg-white rounded-full p-1 shadow-md border border-amber-200">
                          <Bike className="w-5 h-5"/>
                        </div>
                        <div className="absolute -top-1 -right-2 bg-slate-800 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow border border-slate-600">
                          {index + 1}
                        </div>
                      </div>
                    ),
                    className: 'custom-leaflet-icon',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                  })}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 min-w-[200px]">
                      <h3 className="font-bold text-slate-800 text-sm mb-1">{feature.properties.name}</h3>
                      <div className="mb-2 space-y-1 bg-amber-50 p-2 rounded-md border border-amber-100">
                        <div className="text-xs text-amber-800"><span className="font-semibold">Type:</span> {feature.properties.routeType === 'loop' ? 'Loop Route' : 'One-Way Route'}</div>
                        <div className="text-xs text-amber-800"><span className="font-semibold">Distance:</span> {feature.properties.distanceKm?.toFixed(2)} km</div>
                        <div className="text-xs text-amber-800"><span className="font-semibold">Est. Time:</span> ~{feature.properties.estimatedMin} min biking</div>
                        {feature.properties.dateObserved && (
                          <div className="text-xs text-amber-800"><span className="font-semibold">Date:</span> {feature.properties.dateObserved}</div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          }

          return (
          <Marker 
            key={feature.id} 
            position={[feature.coordinates[1], feature.coordinates[0]]} // Leaflet expects [lat, lng]
            icon={L.divIcon({
              html: renderToStaticMarkup(
                <div className="relative">
                  <div className={`drop-shadow-md ${feature.properties.recordType === 'wildlife' ? 'text-emerald-500' : 'text-sky-500'}`}>
                    {feature.properties.recordType === 'wildlife' ? (
                      <Leaf className="w-7 h-7 fill-emerald-100" strokeWidth={1.5} />
                    ) : (
                      <MapPin className="w-8 h-8 fill-sky-100" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className={`absolute ${feature.properties.recordType === 'wildlife' ? '-top-1' : 'top-0'} -right-2 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow border ${feature.properties.recordType === 'wildlife' ? 'bg-emerald-600 border-emerald-400' : 'bg-sky-600 border-sky-400'}`}>
                    {index + 1}
                  </div>
                </div>
              ),
              className: 'custom-leaflet-icon',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            })}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-slate-800 text-sm mb-1">{feature.properties.name}</h3>
                
                {feature.properties.locationName && (
                  <div className="text-xs text-sky-600 mb-2 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {feature.properties.locationName}
                  </div>
                )}
                
                {feature.properties.recordType === 'wildlife' && (
                  <div className="mb-2 space-y-1 bg-emerald-50 p-2 rounded-md border border-emerald-100">
                    {feature.properties.image && (
                      <div className="mb-2">
                        <img src={feature.properties.image} alt={feature.properties.species || 'Wildlife'} className="w-full h-auto rounded border border-emerald-200" />
                      </div>
                    )}
                    {feature.properties.species && (
                      <div className="text-xs text-emerald-800"><span className="font-semibold">Species:</span> {feature.properties.species}</div>
                    )}
                    {feature.properties.category && (
                      <div className="text-xs text-emerald-800"><span className="font-semibold">Category:</span> <span className="capitalize">{feature.properties.category}</span></div>
                    )}
                    {feature.properties.observer && (
                      <div className="text-xs text-emerald-800"><span className="font-semibold">Observer:</span> {feature.properties.observer}</div>
                    )}
                    {feature.properties.dateObserved && (
                      <div className="text-xs text-emerald-800"><span className="font-semibold">Date:</span> {feature.properties.dateObserved}</div>
                    )}
                  </div>
                )}

                {feature.properties.description && (
                  <p className="text-xs text-slate-600 mb-2">{feature.properties.description}</p>
                )}
                
                <div className="bg-slate-100 p-2 rounded text-[10px] text-slate-500 font-mono space-y-1">
                  <div><strong>Lat:</strong> {feature.coordinates[1].toFixed(6)}</div>
                  <div><strong>Lng:</strong> {feature.coordinates[0].toFixed(6)}</div>
                  <div className="pt-1 border-t border-slate-200 mt-1">
                    Added: {new Date(feature.properties.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
