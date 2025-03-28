import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerLayer from './MarkerLayer';          
import FitBoundsOnMarkers from './FitBoundsOnMarkers'; 

// fix default Leaflet marker icons in React
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const [fireZones, setFireZones] = useState(null);
  const [listings, setListings] = useState([]);

  // 1) Fetch Data (wildfire + RapidAPI) once
  useEffect(() => {
    // Wildfire zones
    fetch("https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/California_Historic_Fire_Perimeters/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson")
      .then(res => res.json())
      .then(data => setFireZones(data))
      .catch(err => console.error("Fire zone error:", err));

    // Real Estate from RapidAPI
    const url = "https://us-real-estate-listings.p.rapidapi.com/for-sale?location=Los+Angeles%2C+CA&offset=0&limit=10&sort=relevance&days_on=1&expand_search_radius=1";
    const options = {
      method: "GET",
      headers: {
        // Dont use key until we are ready
        //"x-rapidapi-key": "ac3737644emsh5f564d129b25e99p16afe4jsn8f61499c23f1",
        "x-rapidapi-host": "us-real-estate-listings.p.rapidapi.com"
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log("RapidAPI Real Estate result:", data);
        // data.listings array with item.location.address.coordinate
        if (data?.listings) {
          setListings(data.listings);
        } else if (data?.data?.listings) {
          setListings(data.data.listings);
        }
      })
      .catch(err => console.error("Real Estate fetch error:", err));
  }, []); 

  // Render the <MapContainer>, with layers for:
  //  - Wildfire GeoJSON
  //  - Markers
  //  - FitBounds logic
  return (
    <div className="map-container">
      <MapContainer
        center={[34.05, -118.24]} //near LA
        zoom={11}
        style={{ height: 500, width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Fire zones */}
        {fireZones && (
          <GeoJSON
            data={fireZones}
            style={{ color: 'red', weight: 1 }}
          />
        )}

        {/* Our markers layer */}
        <MarkerLayer listings={listings} />

        {/* Auto-fit bounds if we have any markers */}
        <FitBoundsOnMarkers listings={listings} />
      </MapContainer>
    </div>
  );
}




