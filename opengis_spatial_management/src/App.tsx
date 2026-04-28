import React, { useState, useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import { UserGuide } from './components/UserGuide';
import { RecordWildlifeForm } from './components/RecordWildlifeForm';
import { CycleRouteBuilder } from './components/CycleRouteBuilder';
import { ToolMode, BaseLayer, SpatialFeature } from './types';
import { exportToGeoJSON, calculateDistanceKm } from './utils';
import { MapPin } from 'lucide-react';

export default function App() {
  // Global Application State Management
  const [toolMode, setToolMode] = useState<ToolMode>('pan');
  const [baseLayer, setBaseLayer] = useState<BaseLayer>('osm');
  const [features, setFeatures] = useState<SpatialFeature[]>(() => {
    try {
      const saved = localStorage.getItem('opengis_features');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved features:', e);
    }
    return [];
  });
  const [guideOpen, setGuideOpen] = useState(true); // Open guide by default for new users
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync features to local storage
  useEffect(() => {
    localStorage.setItem('opengis_features', JSON.stringify(features));
  }, [features]);

  // Wildlife Recording Form State
  const [pendingWildlifeCoords, setPendingWildlifeCoords] = useState<[number, number] | null>(null);

  // Cycle Route Building State
  const [activeRouteCoords, setActiveRouteCoords] = useState<[number, number][]>([]);

  // Map viewport memory
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState<number>(3);

  // Apply global class for mouse cursors based on tool mode
  useEffect(() => {
    document.body.className = `mode-${toolMode}`;
  }, [toolMode]);

  const handleMapClick = async (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;

    if (toolMode === 'add-marker') {
      const id = crypto.randomUUID();
      const newFeature: SpatialFeature = {
        id,
        type: 'Point',
        coordinates, // GeoJSON [lng, lat]
        properties: {
          name: `Point ${Math.floor(Math.random() * 1000)}`,
          createdAt: new Date().toISOString(),
          recordType: 'generic',
          locationName: 'Detecting Location...',
        },
      };
      setFeatures((prev) => [...prev, newFeature]);

      import('./utils').then(({ reverseGeocode }) => {
        reverseGeocode(lat, lng).then((cityName) => {
          setFeatures((prev) => prev.map(f => f.id === id ? {
            ...f,
            properties: { 
              ...f.properties, 
              locationName: cityName || 'Unknown Location',
              name: cityName ? `${cityName} Point` : f.properties.name
            }
          } : f));
        });
      });

    } else if (toolMode === 'record-wildlife') {
      setPendingWildlifeCoords(coordinates);
    } else if (toolMode === 'cycle-route') {
      setActiveRouteCoords(prev => [...prev, coordinates]);
    }
  };

  const handleSaveRoute = (type: 'one-way' | 'loop') => {
    if (activeRouteCoords.length < 2) return;
    
    let finalCoords = [...activeRouteCoords];
    if (type === 'loop' && activeRouteCoords.length >= 2) {
      finalCoords.push(activeRouteCoords[0]); // Close the loop
    }
    
    const distanceKm = calculateDistanceKm(finalCoords, false);
    
    const newFeature: SpatialFeature = {
      id: crypto.randomUUID(),
      type: 'LineString',
      coordinates: finalCoords,
      properties: {
        name: `Cycle Route ${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
        recordType: 'route',
        routeType: type,
        distanceKm,
        estimatedMin: Math.round((distanceKm / 15) * 60) || 0,
        dateObserved: new Date().toISOString().split('T')[0]
      }
    };
    
    setFeatures(prev => [...prev, newFeature]);
    setActiveRouteCoords([]);
    setToolMode('pan');
  };

  const handleSaveWildlifeRecord = (data: { species: string; category: any; observer: string; dateObserved: string; notes: string; locationName: string; image: string | null }) => {
    if (!pendingWildlifeCoords) return;
    const newFeature: SpatialFeature = {
      id: crypto.randomUUID(),
      type: 'Point',
      coordinates: pendingWildlifeCoords,
      properties: {
        name: data.species,
        description: data.notes,
        locationName: data.locationName,
        createdAt: new Date().toISOString(),
        recordType: 'wildlife',
        species: data.species,
        category: data.category,
        observer: data.observer,
        dateObserved: data.dateObserved,
        image: data.image === null ? undefined : data.image
      },
    };
    setFeatures((prev) => [...prev, newFeature]);
    setPendingWildlifeCoords(null);
    setToolMode('pan');
  };

  const handleCenterFeature = (coordinates: any) => {
    let target = coordinates;
    if (Array.isArray(coordinates[0])) {
      target = coordinates[0];
    }
    // Convert GeoJSON [lng, lat] target to Leaflet [lat, lng] center
    setMapCenter([target[1], target[0]]);
    setMapZoom(13); // Zoom closely
    
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleExport = () => {
    if (features.length === 0) {
      alert("No features to export. Add some points first!");
      return;
    }
    exportToGeoJSON(features);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden font-sans">
      {/* 
        Code Block 1: The Control Interface (Toolbar)
        Coordinates top-level actions, layer selection invocations, and tool modes.
      */}
      <Toolbar 
        toolMode={toolMode} 
        setToolMode={setToolMode} 
        onOpenGuide={() => setGuideOpen(true)}
        onExport={handleExport}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* 
          Code Block 2: The Logic/Data Management Panel (Sidebar)
          Lists GeoJSON features, supports interaction for bounding/recentering.
        */}
        <Sidebar 
          features={features}
          setFeatures={setFeatures}
          baseLayer={baseLayer}
          setBaseLayer={setBaseLayer}
          onCenterFeature={handleCenterFeature}
          isOpen={sidebarOpen}
        />

        {/* 
          Code Block 3: The Viewport/Cartography Engine (MapView)
          Renders base tiles, binds map interaction events based on toolState.
        */}
        <MapView 
          features={features}
          baseLayer={baseLayer}
          toolMode={toolMode}
          onMapClick={handleMapClick}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          activeRoute={activeRouteCoords}
        />
        
        {/* Mobile Sidebar Overlay overlay */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Cycle Route Builder Panel */}
        {toolMode === 'cycle-route' && (
          <CycleRouteBuilder 
            routeCoords={activeRouteCoords}
            onSave={handleSaveRoute}
            onCancel={() => {
              setActiveRouteCoords([]);
              setToolMode('pan');
            }}
            onClear={() => setActiveRouteCoords([])}
          />
        )}
      </div>

      {/* 
        Code Block 4: The Documentation Layer (UserGuide)
        Provides immediate onboarding and instructional data locally context-driven.
      */}
      <UserGuide 
        isOpen={guideOpen} 
        onClose={() => setGuideOpen(false)} 
      />

      {/* Wildlife Data Collection Modal */}
      {pendingWildlifeCoords && (
        <RecordWildlifeForm
          coordinates={pendingWildlifeCoords}
          onSave={handleSaveWildlifeRecord}
          onCancel={() => setPendingWildlifeCoords(null)}
        />
      )}
    </div>
  );
}
