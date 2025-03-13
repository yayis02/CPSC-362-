import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const ShelterMap = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/shelters")
      .then((response) => response.json())
      .then((data) => {
        console.log("Shelter data fetched:", data);
        setShelters(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[37.5, -119.5]} zoom={6} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {shelters.map((shelter) => (
        <Marker
          key={shelter.id}
          position={[shelter.latitude, shelter.longitude]} // Match your DB fields
          icon={customIcon}
        >
          <Popup>
            <strong>{shelter.name || "Unnamed Shelter"}</strong>
            <br />
            {shelter.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShelterMap;
