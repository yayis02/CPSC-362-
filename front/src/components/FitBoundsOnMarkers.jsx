import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function FitBoundsOnMarkers({ listings }) {
  const map = useMap(); // Hook to get the map instance

  useEffect(() => {
    // Only run if we have listings
    if (listings.length > 0) {
      const latLngs = [];
      listings.forEach((item, i) => {
        const lat = item.location?.address?.coordinate?.lat;
        const lon = item.location?.address?.coordinate?.lon;

        console.log(`Marker data #${i}: lat=${lat}, lon=${lon}`, item);
        if (lat && lon) {
          latLngs.push([lat, lon]);
        }
      });

      if (latLngs.length > 0) {
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds);
      }
    }
  }, [listings, map]);

  return null; // No UI, just logic
}
