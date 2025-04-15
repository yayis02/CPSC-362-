import React, { useState, useEffect, useMemo } from 'react';
import { FaHome, FaMapMarkerAlt, FaDonate, FaInfoCircle, FaSearch, FaBookOpen } from 'react-icons/fa';

import '../index.css';
import Map from './Map';

// AOS for scroll animations (Install AOS via npm)
import AOS from 'aos';
import 'aos/dist/aos.css';

const Main = () => {
  const words = useMemo(() => ['support', 'guide', 'educate'], []);
  const [currentWord, setCurrentWord] = useState(words[0]);
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

    AOS.init();

    return () => clearInterval(wordChangeInterval);
  }, [words]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {

      setShelterResults([]);
      alert("Please enter a valid address or zip code.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5003/api/shelters");

      const query = searchQuery.trim().toLowerCase();
      const data = await res.json();

      if (query === "california") { 
        setShelterResults(data);
        return;
      } 

      const filter = data.filter(shelter =>   
        shelter.city?.toLowerCase().includes(query) ||
        shelter.zip?.toString().includes(query)
      );
      setShelterResults(filter);
    } catch (err) {
      console.error("Error fetching shelters:", err);
      setShelterResults([]);
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
            <li><a href="#learnmore"><FaBookOpen /> Learn More</a></li>
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
      <section id="about" className="about enhanced-about" data-aos="fade-up">
        <div className="about-content">
          <div className="about-text">
            <h2>
              <span role="img" aria-label="fire">🔥</span> Who We Are
            </h2>
            <p>
              <strong>Be Wildfire Safe</strong> is more than just a platform — we're a movement to empower and protect communities. Our mission is to provide life-saving wildfire safety information in a way that’s clear, accessible, and effective.
            </p>
            <p>
              Whether you're a lifelong Californian or new to the area, our goal is to equip you with the tools to stay alert, stay prepared, and stay safe. We use real-time data, intuitive tools, and expert guidance to help reduce wildfire risks and build more resilient communities.
            </p>
          </div>
          <div className="about-icons">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
              <img src="https://cdn-icons-png.flaticon.com/512/4203/4203033.png" alt="Education Icon" />
              <p>Educate</p>
            </div>
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
              <img src="https://cdn-icons-png.flaticon.com/512/3468/3468526.png" alt="Alert Icon" />
              <p>Alert</p>
            </div>
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
              <img src="https://cdn-icons-png.flaticon.com/512/4282/4282788.png" alt="Protect Icon" />
              <p>Protect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locate Section with Map */}
      <section id="locate" className="locate" data-aos="fade-up">
        <h2 className="locate-title">Locate Wildfire Zones</h2>
        <p className="locate-description">
          Use the interactive map below to view active wildfire zones and shelter locations in California. Staying aware of your surroundings is a key step in wildfire preparedness.
        </p>

        <div className="map-info">
          <div className="map-tip">
            🔥 <strong>Red Areas:</strong> High-risk wildfire zones
          </div>
          <div className="map-tip">
            🏠 <strong>Blue Markers:</strong> Emergency food shelters
          </div>
          <div className="map-tip">
            ⚠️ <strong>Zoom In:</strong> Use your mouse or touchpad to explore nearby zones
          </div>
        </div>

        <div className="map-container">
          <Map shelters={shelterResults} />
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="search" data-aos="fade-up">
        <h2>Find Nearby Food Shelters</h2>
        <p>Enter your location to find the nearest food shelters in case of an emergency.</p>

        {/* FORM to allow "Enter" key submission */}
        <form
          className="search-box"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Enter your address or zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Display Search Results */}
        <div className="shelter-results">
          {shelterResults === null ? (
            <p className="search-placeholder">Start by searching your area above.</p>
          ) : shelterResults.length === 0 ? (
            <p className="no-results">No shelters found for your search. Please try another location.</p>
          ) : (
            <ul>
              {shelterResults.map((shelter, index) => (
                <li key={index}>
                  <h3>{shelter.name}</h3>
                  <p>{`${shelter.address}, ${shelter.zip}, ${shelter.city}`}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Donate Section with Background Video */}
      <section id="donate" className="donate-section">
        <div className="donate-overlay">
          <h2>Support our cause</h2>
          <p>Your donation helps save lives.</p>

          {/* Donation Links */}
          <div className="donation-links">
            <a href="https://www.redcross.org/donate" target="_blank" rel="noopener noreferrer" className="donation-link">
              Red Cross Donation
            </a>
            <a href="https://www.globalgiving.org/projects/wildfire-relief/" target="_blank" rel="noopener noreferrer" className="donation-link">
              GlobalGiving Wildfire Relief
            </a>
            <a href="https://www.gofundme.com/f/wildfire-relief-fund" target="_blank" rel="noopener noreferrer" className="donation-link">
              GoFundMe Wildfire Relief
            </a>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section id="learnmore" className="learn-more" data-aos="fade-up">
        <div className="learn-more-container">
          <h2 className="learn-more-title">Learn More About Wildfires</h2>
          <p className="learn-more-intro">
            Arm yourself with critical wildfire knowledge. Explore trusted resources to help you prepare, act, and recover with confidence.
          </p>

          <div className="resource-cards">
            <div className="resource-card">
              <h3>🔥 Wildfire Basics</h3>
              <p>Discover how wildfires start, why they spread, and how nature and communities are affected.</p>
              <a href="https://www.nps.gov/articles/wildfire-basics.htm" target="_blank" rel="noopener noreferrer" className="resource-btn">
                Learn the Basics
              </a>
            </div>

            <div className="resource-card">
              <h3>🛠️ Be Prepared</h3>
              <p>Build an emergency kit, secure your home, and make a wildfire evacuation plan for your family.</p>
              <a href="https://www.readyforwildfire.org/prepare-for-wildfire/" target="_blank" rel="noopener noreferrer" className="resource-btn">
                Get Prepared
              </a>
            </div>

            <div className="resource-card">
              <h3>📡 Live Updates</h3>
              <p>Track real-time wildfire incidents and alerts with the latest official reports and maps.</p>
              <a href="https://www.fire.ca.gov/incidents/" target="_blank" rel="noopener noreferrer" className="resource-btn">
                View Live Alerts
              </a>
            </div>

            <div className="resource-card">
              <h3>💛 Recovery & Relief</h3>
              <p>Access FEMA resources, housing, food assistance, and mental health support post-fire.</p>
              <a href="https://www.fema.gov/assistance/individual" target="_blank" rel="noopener noreferrer" className="resource-btn">
                Find Support
              </a>
            </div>
          </div>
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
