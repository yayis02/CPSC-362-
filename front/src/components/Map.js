import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerLayer from './MarkerLayer';
import FitBoundsOnMarkers from './FitBoundsOnMarkers';
import ShelterMarkerLayer from './ShelterMarkerLayer';
import LegendControl from './LegendControl';

// fix default Leaflet marker icons in React
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map({ shelters }) {
  const [fireZones, setFireZones] = useState(null);
  const [listings, setListings] = useState([]);
  const mapRef = useRef(null);

  // Fetch Data (wildfire + RapidAPI) once
  useEffect(() => {
    fetch("https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/California_Historic_Fire_Perimeters/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson")
      .then(res => res.json())
      .then(data => setFireZones(data))
      .catch(err => console.error("Fire zone error:", err));

    const url = "https://us-real-estate-listings.p.rapidapi.com/for-sale?location=Los+Angeles%2C+CA&offset=0&limit=10&sort=relevance&days_on=1&expand_search_radius=1";
    const options = {
      method: "GET",
      headers: {
       "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
       "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST
        
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log("RapidAPI Real Estate result:", data);
        if (data?.listings) {
          setListings(data.listings);
        } else if (data?.data?.listings) {
          setListings(data.data.listings);
        }
      })
      .catch(err => console.error("Real Estate fetch error:", err));
  }, []);

  // Add map legend after map is ready
  useEffect(() => {
    console.log("Legend effect triggered. mapRef.current =", mapRef.current);
    if (!mapRef.current || window._legendAdded) return;

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <h4>Map Key</h4>
        <div><i style="background: red; width: 12px; height: 12px; display: inline-block; margin-right: 6px;"></i> Fire Zone</div>
        <div><img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" style="width: 12px; margin-right: 6px;" /> Real Estate</div>
        <div><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" style="width: 12px; margin-right: 6px;" /> Shelter</div>
      `;
      return div;
    };

    legend.addTo(mapRef.current);
    window._legendAdded = true;
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[34.05, -118.24]}
        zoom={11}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        style={{ height: 500, width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {fireZones && (
          <GeoJSON
            data={fireZones}
            style={{ color: 'red', weight: 1 }}
          />
        )}
        <MarkerLayer listings={listings} />
        <ShelterMarkerLayer shelters={shelters} />
        <FitBoundsOnMarkers listings={listings} />
        <LegendControl />
      </MapContainer>
    </div>
  );
}
