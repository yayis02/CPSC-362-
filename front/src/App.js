import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [homes, setHomes] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/homes')
            .then(response => response.json())
            .then(data => setHomes(data))
            .catch(error => console.error('Error fetching homes:', error));
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Fire Risk & Real Estate Map</h1>
                <p>Find homes in safe areas away from fire-prone zones</p>
            </header>
            <div className="home-list">
                {homes.length > 0 ? (
                    homes.map((home, index) => (
                        <div key={index} className="home-card">
                            <h2>{home.address}</h2>
                            <p><strong>Latitude:</strong> {home.lat}</p>
                            <p><strong>Longitude:</strong> {home.lon}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading homes...</p>
                )}
            </div>
        </div>
    );
}

export default App;

