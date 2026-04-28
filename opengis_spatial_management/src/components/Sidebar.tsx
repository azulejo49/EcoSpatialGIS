import React, { useState } from 'react';
import { Layers, MapPin, Trash2, Crosshair, ChevronRight, ChevronDown, Leaf, Bike } from 'lucide-react';
import { SpatialFeature, BaseLayer, BASE_LAYERS } from '../types';

interface SidebarProps {
  features: SpatialFeature[];
  setFeatures: React.Dispatch<React.SetStateAction<SpatialFeature[]>>;
  baseLayer: BaseLayer;
  setBaseLayer: (layer: BaseLayer) => void;
  onCenterFeature: (coords: [number, number]) => void;
  isOpen: boolean;
}

export function Sidebar({ features, setFeatures, baseLayer, setBaseLayer, onCenterFeature, isOpen }: SidebarProps) {
  const [layersExpanded, setLayersExpanded] = useState(true);
  const [dataExpanded, setDataExpanded] = useState(true);

  const deleteFeature = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeatures(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div 
      className={`bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col w-72 h-[calc(100vh-3.5rem)] absolute md:relative z-30 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex-1 overflow-y-auto w-full">
        {/* Base Layers Module */}
        <div className="border-b border-slate-800">
          <button 
            onClick={() => setLayersExpanded(!layersExpanded)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center space-x-2 font-semibold text-slate-200">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Base Maps</span>
            </div>
            {layersExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {layersExpanded && (
            <div className="p-4 pt-0 space-y-2">
              {(Object.keys(BASE_LAYERS) as BaseLayer[]).map((layerKey) => (
                <label key={layerKey} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="baseLayer" 
                    value={layerKey}
                    checked={baseLayer === layerKey}
                    onChange={() => setBaseLayer(layerKey)}
                    className="form-radio text-emerald-500 bg-slate-800 border-slate-700 focus:ring-emerald-500 focus:ring-offset-slate-900" 
                  />
                  <span className={`text-sm transition-colors ${baseLayer === layerKey ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {BASE_LAYERS[layerKey].name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Spatial Features Module */}
        <div>
          <button 
            onClick={() => setDataExpanded(!dataExpanded)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center space-x-2 font-semibold text-slate-200">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>Spatial Features ({features.length})</span>
            </div>
            {dataExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {dataExpanded && (
            <div className="p-2 space-y-1">
              {features.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 text-center border border-dashed border-slate-700/50 m-2 rounded bg-slate-800/20">
                  No spatial data added yet. Use the Add Point tool on the map.
                </div>
              ) : (
                features.map((feature) => (
                  <div 
                    key={feature.id} 
                    className={`flex flex-col rounded p-3 cursor-pointer border transition-colors group mb-1 ${
                      feature.properties.recordType === 'wildlife' 
                        ? 'bg-emerald-900/10 border-emerald-900/30 hover:border-emerald-700/60' 
                        : feature.properties.recordType === 'route'
                        ? 'bg-amber-900/10 border-amber-900/30 hover:border-amber-700/60'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-transparent hover:border-slate-700'
                    }`}
                    onClick={() => onCenterFeature(feature.coordinates)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 truncate pr-2">
                        {feature.properties.recordType === 'wildlife' ? (
                          <Leaf className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        ) : feature.properties.recordType === 'route' ? (
                          <Bike className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-slate-200 truncate">
                          {feature.properties.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Feature"
                          onClick={(e) => deleteFeature(feature.id, e)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {feature.properties.recordType === 'wildlife' && (
                       <div className="text-xs text-emerald-400/80 mt-1 truncate pl-5">
                         {feature.properties.category} \u2022 {feature.properties.dateObserved}
                       </div>
                    )}
                    {feature.properties.recordType === 'route' && (
                       <div className="text-xs text-amber-400/80 mt-1 truncate pl-5">
                         {feature.properties.routeType === 'loop' ? 'Loop' : 'One-Way'} \u2022 {feature.properties.distanceKm?.toFixed(2)}km \u2022 ~{feature.properties.estimatedMin}m
                       </div>
                    )}
                    {feature.properties.locationName && (
                       <div className="text-[10px] text-slate-400 mt-1 truncate pl-5 font-medium">
                         {feature.properties.locationName}
                       </div>
                    )}
                    <div className="flex items-center justify-between mt-2 pl-5">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                         {feature.type === 'LineString' ? (
                           <span>Route Path ({feature.coordinates.length} pts)</span>
                         ) : (
                           <span>[{feature.coordinates[0].toFixed(4)}, {feature.coordinates[1].toFixed(4)}]</span>
                         )}
                      </div>
                      <Crosshair className="w-3 h-3 text-slate-500" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
