import React, { useState, useEffect, useMemo } from 'react';
import { FaHome, FaMapMarkerAlt, FaDonate, FaInfoCircle, FaSearch } from 'react-icons/fa';
//import videoBg from '../assets/main_page.mp4';
import '../index.css';

import {Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Helper component to update the map view
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapUpdater = ({ setMapCenter, setMapZoom }) => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapCenter([center.lat, center.lng]);
      setMapZoom(zoom);
    },
  });
  return null;
};

// AOS for scroll animations (Install aos via npm)
import AOS from 'aos';
import 'aos/dist/aos.css';

// Leaflet imports for the map
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Main = () => {
  const words = useMemo(() => ['support', 'guide', 'educate'], []);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [fireZones, setFireZones] = useState(null);

  // State for all shelters and the filtered results
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Map center and zoom state
  const [mapCenter, setMapCenter] = useState([37.5, -119.5]);
  const [mapZoom, setMapZoom] = useState(6);
  const [autoZoom, setAutoZoom] = useState(false);

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);

    // Initialize AOS (Animate On Scroll)
    AOS.init();

    // Fetch wildfire zones (GeoJSON) data
    fetch("https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/California_Historic_Fire_Perimeters/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson")
      .then((response) => response.json())
      .then((data) => setFireZones(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));

    return () => clearInterval(wordChangeInterval);
  }, [words]);

  //Local Shelter's Database
  useEffect(() => {
    fetch("http://localhost:5000/api/shelters")
      .then((response) => response.json())
      .then((data) => {
        console.log("Shelter data fetched:", data);
        setShelters(data);
        setFilteredShelters(data); // Update filteredShelters with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  //Location Icon for shelters
  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

    // Handle search form submission
    const handleSearch = (e) => {
      e.preventDefault();
      const term = searchTerm.toLowerCase();
      // Filter shelters by zip or city
      const filtered = shelters.filter((shelter) => {
        const zip = shelter.zip ? shelter.zip.toString().toLowerCase() : "";
        const city = shelter.city ? shelter.city.toLowerCase() : "";
        return zip.includes(term) || city.includes(term);
      });
      setFilteredShelters(filtered);
    
      // If we have at least one result, update map center and zoom
      if (filtered.length > 0) {
        setMapCenter([filtered[0].latitude, filtered[0].longitude]);
        setMapZoom(12);
        setAutoZoom(true);
        // Disable autoZoom after a short delay so it doesn't override user panning
        setTimeout(() => setAutoZoom(false), 1000);
      } else {
        // Optionally, alert the user or reset map view
        alert("No shelters found for that search term.");
      }
    };
  

  return (
    <div className="main">
    

      {/* Navbar */}
      <div className="navbar">
        <h2 className="navbar-title">Be Wildfire Safe</h2>
        <nav>
          <ul>
            <li><a href="#home"><FaHome /> Home</a></li>
            <li><a href="#locate"><FaMapMarkerAlt /> Locate</a></li>
            <li><a href="#donate"><FaDonate /> Donate</a></li>
            <li><a href="#about"><FaInfoCircle /> About</a></li>
            <li><a href="#learnmore"><FaInfoCircle /> Learn More</a></li>
            <li><a href="#search"><FaSearch /> Search</a></li>
          </ul>
        </nav>
      </div>

      {/* Dynamic Message */}
      <div className="content">
        <h1 className="title">
          Let us{' '}
          <span className="highlighted-text">{currentWord}</span> you on wildfires in California
        </h1>
      </div>

      {/* About Us Section */}
      <section id="about" className="about" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          We are committed to raising awareness about wildfire safety, providing crucial information, and offering resources for everyone. Our goal is to help you prepare for wildfire risks and stay informed.
        </p>
      </section>

      {/* Why Wildfire Safety Section */}
      <section id="why-safety" className="why-safety" data-aos="fade-up" data-aos-delay="200">
        <h2>Why Wildfire Safety?</h2>
        <p>
          Wildfires are a growing threat, particularly in regions like California. With rising temperatures and dry conditions, the risk of wildfires increases. We aim to provide the tools, education, and support to help communities stay safe.
        </p>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="mission" data-aos="fade-up" data-aos-delay="400">
        <h2>Our Mission</h2>
        <p>
          Our mission is to protect lives and properties by empowering individuals with the right information and resources to take action before, during, and after wildfires.
        </p>
      </section>

      {/* Locate Section with Map */}
      <section id="locate" className="locate" data-aos="fade-up">
        <h2>Locate Wildfire Zones</h2>
        <p>Explore the areas known to be prone to wildfires. Stay informed and stay safe!</p>
        
        {/* Map Container */}
        <div className="map-container">
          <MapContainer center={[37.75, -119.5]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {fireZones && <GeoJSON data={fireZones} style={{ color: "red" }} />}
          </MapContainer>
        </div>
      </section>

      {/* Search Section */}
      <section id="locate" className="locate" data-aos="fade-up">
        <h2>Find Assistance</h2>
        <p>Find housing shelter or food assistance</p>
      <div>
        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Enter Zip code or City"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="custom-input"
          />
          <button type="submit" className="btn">Search</button>
        </form>
  
        {/* Map Container */}
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "600px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Update map view when center/zoom changes */}
          {autoZoom && <ChangeMapView center={mapCenter} zoom={mapZoom} />}
          {filteredShelters.map((shelter) => (
            <Marker
              key={shelter.id}
              position={[shelter.latitude, shelter.longitude]} // Use your DB fields
              icon={customIcon}
            >
              <Popup>
                <strong>{shelter.name || "Unnamed Shelter"}</strong>
                <div style={{ whiteSpace: "pre" }}>
                  <br />
                    {[shelter.address]}
                  <br />
      
                    {[shelter.city, ", ", shelter.zip, " ,", shelter.state]}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      </section>

      {/* Footer Section */}
      <section className="footer">
        <p>&copy; 2025 Be Wildfire Safe. All rights reserved.</p>
      </section>
    </div>
  );
};

export default Main;
