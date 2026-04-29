<div align="center">
  <img src="/badge.svg" width="340"/>
</div>

  
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
