import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = () => {
    const [fireZones, setFireZones] = useState(null);

    useEffect(() => {
        fetch("https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/California_Historic_Fire_Perimeters/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson") // api link geojson
            .then((response) => response.json())
            .then((data) => setFireZones(data))
            .catch((error) => console.error("Error loading GeoJSON:", error));
    }, []);

    return (
        <div className="map-container">
            <MapContainer center={[37.75, -119.5]} zoom={6} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {fireZones && <GeoJSON data={fireZones} style={{ color: "red" }} />}
            </MapContainer>
        </div>
    );
};

export default Map;
