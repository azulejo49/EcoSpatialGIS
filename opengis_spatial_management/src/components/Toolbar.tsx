import React, { useState, useEffect } from 'react';
import { BookOpen, Map, Settings, Download, Plus, Hand, Layers, Leaf, Bike, WifiOff } from 'lucide-react';
import { ToolMode } from '../types';

interface ToolbarProps {
  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
  onOpenGuide: () => void;
  onExport: () => void;
  toggleSidebar: () => void;
}

export function Toolbar({ toolMode, setToolMode, onOpenGuide, onExport, toggleSidebar }: ToolbarProps) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 h-14 flex items-center justify-between px-4 z-40 relative shadow-md flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="flex items-center space-x-2 mr-2 md:mr-6 text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none cursor-pointer"
          title="Toggle Sidebar"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594 0 25.4 4.132 49.846 11.75 72.687 40.154-24.203 76.02-41.17 107.56-52.03-35.752 5.615-66.405 23.66-109.843 4 31.552-27.765 87.682-65.842 138.532-71.658 26.58-21.615 68.113-43.962 89.655-37.28 30.492-26.873 67.982-61.093 108.125-85.75 10.667 16.156 17.124 35.94 12.563 57.874-80.37 20.205-61.692 148.928 13.468 67.44 6.348 13.064 9.41 26.665 9.095 41.436-32.675 33.83-66.97 63.026-101.938 87.906.466 23.99-5.605 52.915-19 84.813-5.635 13.42-7.33 36.406 22.875 53.97 101.14-24.012 176.375-114.924 176.375-223.408 0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968 12.083-.036 25.612 2.882 37.5 6.156 6.208-6.698 10.236-18.52 8.345-25.125z"/>
          </svg>
          <span className="font-bold text-lg tracking-tight hidden md:inline">OpenGIS</span>
        </button>
        
        {isOffline && (
          <div className="hidden sm:flex items-center space-x-1.5 px-2 py-1 bg-rose-500/20 text-rose-400 rounded-md text-[10px] uppercase font-bold tracking-wider border border-rose-500/30 mr-2">
            <WifiOff className="w-3 h-3" />
            <span>Offline</span>
          </div>
        )}
        
        <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-md">
          <button
            onClick={() => setToolMode('pan')}
            className={`p-1.5 rounded flex items-center space-x-2 transition-colors ${
              toolMode === 'pan' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-700 text-slate-400'
            }`}
            title="Pan & Select Tool"
          >
            <Hand className="w-4 h-4" />
            <span className="text-xs font-medium pr-1 hidden sm:inline">Pan</span>
          </button>
          <button
            onClick={() => setToolMode('add-marker')}
            className={`p-1.5 rounded flex items-center space-x-2 transition-colors ${
              toolMode === 'add-marker' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-700 text-slate-400'
            }`}
            title="Add Generic Point"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-medium pr-1 hidden sm:inline">Add Point</span>
          </button>
          <button
            onClick={() => setToolMode('record-wildlife')}
            className={`p-1.5 rounded flex items-center space-x-2 transition-colors ${
              toolMode === 'record-wildlife' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-700 text-emerald-400/70 border border-emerald-900 hover:border-emerald-700'
            }`}
            title="Record Wildlife"
          >
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-medium pr-1 hidden sm:inline">Wildlife Record</span>
          </button>
          <button
            onClick={() => setToolMode('cycle-route')}
            className={`p-1.5 rounded flex items-center space-x-2 transition-colors ${
              toolMode === 'cycle-route' ? 'bg-amber-500 text-white' : 'hover:bg-slate-700 text-amber-500/80 border border-amber-900/50 hover:border-amber-700/80'
            }`}
            title="Cycle Route"
          >
            <Bike className="w-4 h-4" />
            <span className="text-xs font-medium pr-1 hidden sm:inline">Cycle Route</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
          title="Export GeoJSON"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Data</span>
        </button>
        
        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        
        <button
          onClick={onOpenGuide}
          className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors rounded hover:bg-slate-800 flex items-center gap-2"
          title="User Guide"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-medium pr-1">Guide</span>
        </button>
        
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-800 md:hidden"
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
