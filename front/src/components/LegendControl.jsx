import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function LegendControl() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-control legend');
        div.innerHTML = `
          <h4 style="
            margin: 0 0 8px; 
            font-family: 'Roboto', sans-serif; 
            font-weight: 700;
            color: #2c2c2c;
          ">
            Map Legend
          </h4>
          
          <!-- Fire Zones row (square) -->
          <div style="
            display: flex; 
            align-items: center; 
            margin-bottom: 6px;
          ">
            <div style="
              width: 16px; 
              height: 16px;
              background: #ff9999; 
              margin-right: 8px; 
              border-radius: 2px;
              display: inline-block;
            "></div>
            <span style="
              font-family: 'Roboto', sans-serif; 
              color: #3c3c3c; 
              font-weight: 400;
            ">Fire Zones</span>
          </div>
      
          <!-- Real Estate row (blue marker icon) -->
          <div style="
            display: flex; 
            align-items: center; 
            margin-bottom: 6px;
          ">
            <img 
              src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
              style="
                width: 16px; 
                margin-right: 8px; 
                display: inline-block;
              "
            />
            <span style="
              font-family: 'Roboto', sans-serif; 
              color: #3c3c3c; 
              font-weight: 400;
            ">Real Estate Listings</span>
          </div>
          
          <!-- Shelter row (orange icon) -->
          <div style="
            display: flex; 
            align-items: center; 
            margin-bottom: 0;
          ">
            <img 
              src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png"
              style="
                width: 16px; 
                margin-right: 8px; 
                display: inline-block;
              "
            />
            <span style="
              font-family: 'Roboto', sans-serif; 
              color: #3c3c3c; 
              font-weight: 400;
            ">Shelter Locations</span>
          </div>
        `;
        return div;
      };
      
      

    legend.addTo(map);
    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null;
}
