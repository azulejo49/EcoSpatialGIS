<div align="center">
  <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="#34d399" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594 0 25.4 4.132 49.846 11.75 72.687 40.154-24.203 76.02-41.17 107.56-52.03-35.752 5.615-66.405 23.66-109.843 4 31.552-27.765 87.682-65.842 138.532-71.658 26.58-21.615 68.113-43.962 89.655-37.28 30.492-26.873 67.982-61.093 108.125-85.75 10.667 16.156 17.124 35.94 12.563 57.874-80.37 20.205-61.692 148.928 13.468 67.44 6.348 13.064 9.41 26.665 9.095 41.436-32.675 33.83-66.97 63.026-101.938 87.906.466 23.99-5.605 52.915-19 84.813-5.635 13.42-7.33 36.406 22.875 53.97 101.14-24.012 176.375-114.924 176.375-223.408 0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968 12.083-.036 25.612 2.882 37.5 6.156 6.208-6.698 10.236-18.52 8.345-25.125z"/>
  </svg>
  
  # OpenGIS - EcoSpatial
  
  **Geographic Information System & Spatial Management**
</div>

> **Author:** Amiram Azulay

## 🌍 Overview

**OpenGIS EcoSpatial** is a professional-grade, browser-based Geographic Information System (GIS) designed for pure client-side spatial management. Engineered as a true Progressive Web App (PWA), it enables users to record wildlife worldwide, map cycle routes, and manage geographic data—all with complete privacy, zero mandatory backend infrastructure, and offline readiness.

## ✨ Key Features

- **Progressive Web App (PWA):** Installable on desktops and mobile devices. Full offline support with aggressive caching strategies for OSM and Esri tiles via Workbox service workers.
- **Cycle Route Builder:** Map precise cycle routes with multi-waypoint support. Instantly calculates distance (in km) and estimated travel time (~15 km/h). Choose between one-way direct routes or closed geographic loops.
- **Wildlife WorldWide Logging:** Record species observations directly onto the map. Supports rich metadata including species names, biological categories (Mammals, Birds, etc.), and observer data.
- **Auto-Compressed Photo Evidence:** Leverage in-browser HTML5 `<canvas>` rendering to downscale uploaded images instantly to base64 texts, sidestepping memory bloat while persisting reference photos for wildlife logging.
- **Client-Side Privacy:** No external database or registration required. Data runs in a secure, local session sandbox. 
- **Universal GIS Interoperability:** Export generated spatial features as structured `GeoJSON` files natively compatible with QGIS, ArcGIS, and other standard systems.
- **Responsive Dynamic Layout:** An optimal interface that seamlessly adapts from ultrawide desktop monitors to mobile iOS/Android touch interfaces.

## 🏗️ Architecture & Tech Stack

This project was built focusing on performance to guarantee fluid cartographic rendering in native browsers.

- **Core Framework:** React 18+ with TypeScript
- **Build System:** Vite (Lightning-fast HMR and optimized production bundling)
- **Styling:** Tailwind CSS (Utility-first styling applied directly to semantic DOM elements)
- **Cartography Engine:** Leaflet integrated with React-Leaflet bindings
- **PWA Tooling:** `vite-plugin-pwa` combined with `workbox` custom caching rules for offline tile access.
- **State Architecture:** Modern React Hook composition prioritizing separation between UI controls (Toolbar/Sidebar) and master GeoJSON state elements.

## 📂 Code Structure

```text
/
├── public/                 # Static assets, Web Manifests, App Icons
├── src/                    # Source code
│   ├── components/         # React module ecosystem
│   │   ├── MapView.tsx           # Cartography, Layers, and Event delegation
│   │   ├── Sidebar.tsx           # Visualizing the local GeoJSON feature collection
│   │   ├── Toolbar.tsx           # Global logic commands & action switches
│   │   ├── UserGuide.tsx         # In-App modular documentation
│   │   ├── RecordWildlifeForm.tsx# The ecological form & Image auto-compressor
│   │   └── CycleRouteBuilder.tsx # Geo-coordinate processor for routing
│   │
│   ├── utils.ts            # Mathematical geo-utilities, GeoJSON parsers
│   ├── types.ts            # Type invariants and schema definitions
│   ├── App.tsx             # System orchestrator & master spatial state
│   └── main.tsx            # DOM initialization & ServiceWorker binding
│
├── package.json            # Dependency manifest
├── vite.config.ts          # Build logic & ServiceWorker cache policies
└── index.html              # Core document body & Meta configurations
```

## 🚀 Installation & Setup

To boot this environment locally for development and testing:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build exclusively for production:**
   ```bash
   npm run build
   ```

## 📖 Usage Instructions

1. **Navigating the Map:** Use the standard Pan tool to navigate the globe. Open the Layer Manager (top right of the map) to toggle between OpenStreetMap, Satellite imagery, or Topographic views.
2. **Recording Wildlife:** Select the `Wildlife Record` tool and tap any coordinate on the Map. A spatial form will prompt you to type the species name, verify the biological category, attach notes, and instantly compress an observational photo.
3. **Drafting a Cycle Route:** Select the `Cycle Route` tool. Start left-clicking/tapping the map to lay down waypoints. Your distance is dynamically generated. At the end, choose to save it as a continuous Loop, or absolute One-Way.
4. **Data Management:** Open the Sidebar (Layers icon) to inspect your recorded features, locate them instantly via the crosshair targets, or strip out inaccurate points. 
5. **Exporting to GeoJSON:** With your data populated, click the `Export GeoJSON` download icon in the toolbar to save your map exactly as mapped.

---

*OpenGIS EcoSpatial is committed to decentralized open-source geographic software.*
