import React from 'react';
import { X, Bike, Route } from 'lucide-react';
import { calculateDistanceKm } from '../utils';

interface CycleRouteBuilderProps {
  routeCoords: [number, number][];
  onSave: (type: 'one-way' | 'loop') => void;
  onCancel: () => void;
  onClear: () => void;
}

export function CycleRouteBuilder({ routeCoords, onSave, onCancel, onClear }: CycleRouteBuilderProps) {
  const distOneWay = calculateDistanceKm(routeCoords, false);
  const distLoop = calculateDistanceKm(routeCoords, true);
  
  // Assume ~15 km/h cycling speed
  const timeOneWay = Math.round((distOneWay / 15) * 60) || 0;
  const timeLoop = Math.round((distLoop / 15) * 60) || 0;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl min-w-[320px] max-w-[90vw]">
      <div className="flex items-center gap-2 mb-1">
        <Bike className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-bold tracking-tight">Draw Cycle Route</h3>
      </div>
      <p className="text-slate-400 text-xs mb-4">Click directly on the map to add waypoints.</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
             <Route className="w-3 h-3"/> One-Way
          </div>
          <div className="text-sm text-amber-400 font-mono font-medium">{distOneWay.toFixed(2)} km</div>
          <div className="text-xs text-slate-400 mt-1">~{timeOneWay} min</div>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
            <Route className="w-3 h-3"/> Loop
          </div>
          <div className="text-sm text-sky-400 font-mono font-medium">{distLoop.toFixed(2)} km</div>
          <div className="text-xs text-slate-400 mt-1">~{timeLoop} min</div>
        </div>
      </div>
      
      <div className="flex gap-2 justify-between items-center">
         <button onClick={onClear} disabled={routeCoords.length === 0} className="text-slate-400 text-xs hover:text-white px-2 disabled:opacity-50 transition-colors">
            Clear Path
         </button>
         <div className="flex gap-2">
           <button 
             onClick={() => routeCoords.length > 1 && onSave('one-way')} 
             disabled={routeCoords.length < 2} 
             className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs px-3 py-2 rounded font-medium transition-colors"
           >
             Save One-Way
           </button>
           <button 
             onClick={() => routeCoords.length >= 2 && onSave('loop')} 
             disabled={routeCoords.length < 2} 
             className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs px-3 py-2 rounded font-medium transition-colors"
           >
             Save Loop
           </button>
         </div>
      </div>
      <button 
        onClick={onCancel} 
        className="absolute -top-3 -right-3 bg-slate-800 p-1.5 rounded-full text-slate-400 hover:text-white border border-slate-700 transition-colors shadow-lg"
      >
        <X className="w-4 h-4"/>
      </button>
    </div>
  );
}
