import React from 'react';
import { X, Map, Layers, Download, Plus, Hand, Database, Leaf, Bike, Route } from 'lucide-react';

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserGuide({ isOpen, onClose }: UserGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div 
        className="bg-slate-900 border border-emerald-500/30 rounded-xl shadow-2xl shadow-emerald-900/20 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/40">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594 0 25.4 4.132 49.846 11.75 72.687 40.154-24.203 76.02-41.17 107.56-52.03-35.752 5.615-66.405 23.66-109.843 4 31.552-27.765 87.682-65.842 138.532-71.658 26.58-21.615 68.113-43.962 89.655-37.28 30.492-26.873 67.982-61.093 108.125-85.75 10.667 16.156 17.124 35.94 12.563 57.874-80.37 20.205-61.692 148.928 13.468 67.44 6.348 13.064 9.41 26.665 9.095 41.436-32.675 33.83-66.97 63.026-101.938 87.906.466 23.99-5.605 52.915-19 84.813-5.635 13.42-7.33 36.406 22.875 53.97 101.14-24.012 176.375-114.924 176.375-223.408 0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968 12.083-.036 25.612 2.882 37.5 6.156 6.208-6.698 10.236-18.52 8.345-25.125z"/>
            </svg>
            <h2 className="text-xl font-bold tracking-tight text-white">OpenGIS User Guide</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-slate-300">
          <div className="prose prose-invert prose-emerald max-w-none">
            
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Welcome to <strong>OpenGIS</strong>, a professional-grade web mapping and spatial data management tool designed entirely around client-side operations. No registration, no server synchronization, complete data privacy.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-800">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-emerald-400 mt-0 mb-4">
                  <Database className="w-5 h-5" />
                  <span>File Structure & Storage</span>
                </h3>
                <ul className="space-y-2 text-sm text-slate-300 m-0 p-0 list-inside list-disc">
                  <li><strong>Local Persistence:</strong> Your active session is saved entirely in memory. It won't persist past a refresh natively unless exported.</li>
                  <li><strong>GeoJSON Spec:</strong> All data is strictly formatted to RFC 7946 GeoJSON.</li>
                  <li><strong>Exporting:</strong> Click the "Export Data" button to save your collection to your `Downloads` directory as `.geojson`.</li>
                </ul>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-800">
                 <h3 className="flex items-center gap-3 text-lg font-semibold text-emerald-400 mt-0 mb-4">
                  <Layers className="w-5 h-5" />
                  <span>Base Layers</span>
                </h3>
                <p className="text-sm text-slate-300 m-0 mb-3 leading-relaxed">
                  Toggle map backgrounds in the left sidebar to analyze terrain, infrastructure, or aerial photography:
                </p>
                <ul className="space-y-2 text-sm text-slate-300 m-0 p-0 list-inside list-disc">
                  <li><strong>OpenStreetMap:</strong> High-detail infrastructure map.</li>
                  <li><strong>Topography:</strong> Elevation and terrain modeling map.</li>
                  <li><strong>Satellite (Esri):</strong> High-resolution worldwide satellite imagery.</li>
                </ul>
              </div>

            </div>

            <h3 className="text-xl font-semibold text-white border-b border-slate-800 pb-2 mb-4 mt-8">Tools & Modes</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-slate-800/10 p-4 rounded-lg">
                <div className="p-2 bg-slate-800 rounded text-slate-300 mt-1">
                  <Hand className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-emerald-400 text-lg mb-1">Pan Tool</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    The default map mode. Allows you to fluidly click and drag to navigate the cartography canvas without accidentally placing coordinates. Use your scroll wheel or pinchgestures to zoom.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-800/10 p-4 rounded-lg">
                <div className="p-2 bg-slate-800 rounded text-emerald-400 mt-1">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-emerald-400 text-lg mb-1">Add Point Tool</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Activates generic point generation mode. Once selected, <strong>click anywhere on the map</strong> to drop a generic coordinate marker.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-900/20 rounded text-emerald-400 mt-1">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-emerald-400 text-lg mb-1">Wildlife Record Tool</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Use this tool to document a specific animal, plant, or fungi. Clicking the map will prompt you to input the species name, observer data, category, reference photo (auto-compressed on device), and date of observation to aid in proper conservation tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-900/20 rounded text-amber-500 mt-1">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-amber-400 text-lg mb-1">Cycle Route Tracker</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Map out cycling paths using multiple waypoints. Calculates total distance (km) and estimated travel time. You can choose to save the route as a linear 'One-Way' path or close the circuit as a 'Loop'.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-800/10 p-4 rounded-lg">
                <div className="p-2 bg-slate-800 rounded text-emerald-400 mt-1">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-emerald-400 text-lg mb-1">Data Export</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Allows you to serialize all displayed spatial features into a standalone <code>.geojson</code> file for consumption by heavyweight GIS platforms like QGIS or ArcGIS Pro, or databases such as PostGIS.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-emerald-900/20 border border-emerald-900/50 rounded-lg">
              <p className="text-sm text-emerald-300/80 m-0 text-center font-medium">
                Thank you for using OpenGIS. Close this window to begin mapping.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            Start Mapping
          </button>
        </div>
      </div>
    </div>
  );
}
