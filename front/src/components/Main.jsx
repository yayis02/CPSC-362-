import React, { useState, useEffect, useMemo } from 'react';
import videoBg from '../assets/main_page.mp4';  
import '../index.css';  

const Main = () => {
  const words = useMemo(() => ['support', 'guide', 'educate'], []);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);

    return () => clearInterval(wordChangeInterval);
  }, [words]);

  return (
    <div className="main">
      {/* Background Video */}
      <video src={videoBg} autoPlay loop muted className="background-video" />

      {/* Navbar */}
      <div className="navbar">
        <h2 className="navbar-title">Be Wildfire Safe</h2>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#locate">Locate</a></li>
            <li><a href="#donate">Donate</a></li>
            <li><a href="#learnmore">Learn More</a></li>
            <li><a href="#search">Search</a></li>
          </ul>
        </nav>
      </div>

      {/* Dynamic message */}
      <div className="content">
        <h1 className="title">
          Let us <span className="highlighted-text">{currentWord}</span> you on wildfires in California
        </h1>
      </div>
    </div>
  );
};

export default Main;

