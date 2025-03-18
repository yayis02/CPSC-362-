import React, { useState, useEffect, useMemo } from 'react';
import { FaHome, FaMapMarkerAlt, FaDonate, FaInfoCircle, FaSearch } from 'react-icons/fa';
import videoBg from '../assets/main_page.mp4';
import '../index.css';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [shelterResults, setShelterResults] = useState(null);

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

  const handleSearch = () => {
    // For now, we'll simulate a search for food shelters
    // In the future, replace this with actual API calls to get shelter locations based on the search query
    setShelterResults([
      { name: "Food Shelter 1", address: "123 Main St, City, CA" },
      { name: "Food Shelter 2", address: "456 Elm St, City, CA" },
      { name: "Food Shelter 3", address: "789 Oak St, City, CA" },
    ]);
  };

  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted className="background-video" />

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
      <section id="search" className="search" data-aos="fade-up">
        <h2>Find Nearby Food Shelters</h2>
        <p>Enter your location to find the nearest food shelters in case of an emergency.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your address or zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Display Search Results */}
        <div className="shelter-results">
          {shelterResults ? (
            <ul>
              {shelterResults.map((shelter, index) => (
                <li key={index}>
                  <h3>{shelter.name}</h3>
                  <p>{shelter.address}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No shelters found. Please try again later.</p>
          )}
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
