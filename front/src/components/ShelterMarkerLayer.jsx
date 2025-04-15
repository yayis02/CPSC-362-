// ShelterMarkerLayer.jsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom icon for shelters (orange)
const shelterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function ShelterMarkerLayer({ shelters }) {
  if (!shelters) return null;

  return (
    <>
      {shelters.map((shelter, idx) => {
        const lat = shelter.latitude;
        const lon = shelter.longitude;

        if (!lat || !lon) return null;

        return (
          <Marker key={idx} position={[lat, lon]} icon={shelterIcon}>
            <Popup>
              <strong>{shelter.name}</strong><br />
              <p>{`${shelter.address}, ${shelter.zip}, ${shelter.city}`}</p>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
