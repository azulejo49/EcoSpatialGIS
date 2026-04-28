# OpenGIS - EcoSpatial GIS - Geographic Information System & Spatial Management
## Record WILDLIFE-WorldWide
## Record Cycle Routes
Author:
##AMIRAM AZULAY##

## Overview
OpenGIS is a professional-grade, browser-based Geographic Information System (GIS) designed for pure client-side operation. It remains 100% free with no membership or registration needed. All spatial data is managed locally.

## Features
- **Spatial Management:** Add point markers, visualize data, and manage dynamic layers.
- **Client-Side Processing:** No backend required, ensuring complete data privacy.
- **GeoJSON Ready:** Data can be exported for use in standardized GIS tools (QGIS, ArcGIS).
- **In-App Documentation:** Built-in guidance for onboarding new users cleanly.
- **Records Wild-Life WorldWide
## Architecture

* **Frontend Framework:** React 19 + TypeScript
* **Build System:** Vite
* **Styling:** Tailwind CSS V4
* **Map Engine:** Leaflet + react-leaflet
* **State Management:** React Hooks (useState/useEffect for layers and tool modes)
* **Data Persistence:** Local browser session (Exportable to local disk)

## Developer Instructions (Logic & Setup)

To run the application locally in standard development mode:
1. `npm install`
2. `npm run dev`

To build the application for production:
1. `npm run build`

### Code Architecture & Block Correlation

The application is split into four primary architectural blocks:

1. **State Engine (`App.tsx`):**
   - Coordinates the active selected tool (e.g., 'add-marker', 'pan').
   - Holds the master `features` array containing standard GeoJSON objects.
   - Manages base layer switching.

2. **Cartography Module (`components/MapView.tsx`):**
   - Implements the Leaflet Map container.
   - Handles map event captures (e.g., extracting latitude/longitude on user click).
   - Renders GeoJSON data and Tile Layers.

3. **Control Interface (`components/Sidebar.tsx` & `components/Toolbar.tsx`):**
   - **Toolbar:** Triggers map interaction modes (Pan vs. Draw/Add).
   - **Sidebar:** Lists current spatial features, providing options to center on them, delete them, and export the entire collection.

4. **Documentation Module (`components/UserGuide.tsx`):**
   - Self-contained modal presenting immediate instructions and GIS feature workflows directly to the user.

## File Structure

```text
/
public/
src/
components/
MapView.tsx      # Map engine and layer rendering
 Sidebar.tsx      # Layer control and feature list
 Toolbar.tsx      # Main application actions
 UserGuide.tsx    # Integrated documentation
 types.ts           # Global interfaces (Features, Tools, etc.)
 utils.ts           # GIS utilities (GeoJSON export logic)
 index.css          # Tailwind and global overrides
 App.tsx            # Main layout and Application State
 main.tsx           # Entry point
   package.json
   readme.md              # Project documentation
   vite.config.ts
```
