// insertData.js
const db = require("./db/database");

const shelters = [
    {
      name: "Salvation Army Riverside Corps",
      address: "3695 1st Street",
      city: "Riverside",
      state: "CA",
      zip: "92501",
      latitude: 33.9845,
      longitude: -117.3694,
      services: "Emergency Shelter, Food Pantry, Worship Services"
    },
    {
      name: "American Red Cross Shelter",
      address: "123 Main St",
      city: "Anaheim",
      state: "CA",
      zip: "92801",
      latitude: 33.8366,
      longitude: -117.9143,
      services: "Emergency Shelter, Food, Medical Assistance"
    },
    {
      name: "Hope Community Shelter",
      address: "456 Elm Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      latitude: 34.0522,
      longitude: -118.2437,
      services: "Temporary Shelter, Counseling, Meals"
    },
    {
      name: "Downtown Homeless Shelter",
      address: "789 Oak Avenue",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      latitude: 32.7157,
      longitude: -117.1611,
      services: "Emergency Shelter, Case Management, Food Assistance"
    },
    {
      name: "Sunrise Family Shelter",
      address: "321 Sunrise Blvd",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      latitude: 37.7749,
      longitude: -122.4194,
      services: "Family Shelter, Childcare, Meals, Counseling"
    },
    {
      name: "Crisis Intervention Center",
      address: "987 Maple Drive",
      city: "Sacramento",
      state: "CA",
      zip: "95814",
      latitude: 38.5816,
      longitude: -121.4944,
      services: "Emergency Shelter, Crisis Intervention, Food Assistance"
    },
    {
      name: "Santa Cruz Safe Haven",
      address: "135 Ocean Ave",
      city: "Santa Cruz",
      state: "CA",
      zip: "95060",
      latitude: 36.9741,
      longitude: -122.0308,
      services: "Emergency Shelter, Food Assistance, Counseling"
    },
    {
      name: "Ventura Community Shelter",
      address: "246 Main Street",
      city: "Ventura",
      state: "CA",
      zip: "93003",
      latitude: 34.2806,
      longitude: -119.2931,
      services: "Emergency Shelter, Case Management, Meals"
    },
    {
      name: "Long Beach Recovery Shelter",
      address: "159 Pacific Avenue",
      city: "Long Beach",
      state: "CA",
      zip: "90802",
      latitude: 33.7701,
      longitude: -118.1937,
      services: "Recovery Shelter, Counseling, Food Assistance"
    },
    {
      name: "Fresno Family Shelter",
      address: "753 Central Ave",
      city: "Fresno",
      state: "CA",
      zip: "93722",
      latitude: 36.7378,
      longitude: -119.7871,
      services: "Family Shelter, Childcare, Meals"
    },
    {
      name: "Berkeley Safe Haven",
      address: "1000 University Ave",
      city: "Berkeley",
      state: "CA",
      zip: "94704",
      latitude: 37.8715,
      longitude: -122.2730,
      services: "Emergency Shelter, Food Assistance, Counseling"
    },
    {
      name: "Oakland Community Shelter",
      address: "200 Broadway",
      city: "Oakland",
      state: "CA",
      zip: "94607",
      latitude: 37.8044,
      longitude: -122.2712,
      services: "Emergency Shelter, Case Management, Job Assistance"
    },
    {
      name: "San Jose Community Shelter",
      address: "1500 N 1st St",
      city: "San Jose",
      state: "CA",
      zip: "95112",
      latitude: 37.3382,
      longitude: -121.8863,
      services: "Emergency Shelter, Food, Medical Assistance"
    },
    {
      name: "Palo Alto Housing Center",
      address: "300 University Ave",
      city: "Palo Alto",
      state: "CA",
      zip: "94301",
      latitude: 37.4419,
      longitude: -122.1430,
      services: "Emergency Shelter, Housing Assistance, Legal Aid"
    },
    {
      name: "Santa Barbara Community Shelter",
      address: "800 State Street",
      city: "Santa Barbara",
      state: "CA",
      zip: "93101",
      latitude: 34.4208,
      longitude: -119.6982,
      services: "Emergency Shelter, Food, Counseling"
    },
    {
      name: "Bakersfield Shelter Center",
      address: "1200 R Street",
      city: "Bakersfield",
      state: "CA",
      zip: "93301",
      latitude: 35.3733,
      longitude: -119.0187,
      services: "Emergency Shelter, Food Assistance, Job Training"
    },
    {
      name: "Modesto Family Shelter",
      address: "250 E 10th St",
      city: "Modesto",
      state: "CA",
      zip: "95350",
      latitude: 37.6391,
      longitude: -120.9969,
      services: "Family Shelter, Childcare, Meals"
    },
    {
      name: "Stockton Recovery Shelter",
      address: "400 S San Joaquin St",
      city: "Stockton",
      state: "CA",
      zip: "95202",
      latitude: 37.9577,
      longitude: -121.2908,
      services: "Emergency Shelter, Recovery Programs, Food Assistance"
    },
    {
      name: "Irvine Emergency Shelter",
      address: "600 Spectrum Center Dr",
      city: "Irvine",
      state: "CA",
      zip: "92618",
      latitude: 33.6846,
      longitude: -117.8265,
      services: "Emergency Shelter, Medical Assistance, Case Management"
    },
    {
      name: "Santa Rosa Support Center",
      address: "1000 Fourth St",
      city: "Santa Rosa",
      state: "CA",
      zip: "95401",
      latitude: 38.4405,
      longitude: -122.7144,
      services: "Emergency Shelter, Counseling, Food Assistance"
    }
  ];
  

shelters.forEach((shelter) => {
  db.run(
    `INSERT INTO shelters (name, address, city, state, zip, latitude, longitude, services)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      shelter.name,
      shelter.address,
      shelter.city,
      shelter.state,
      shelter.zip,
      shelter.latitude,
      shelter.longitude,
      shelter.services
    ],
    function (err) {
      if (err) {
        console.error("Error inserting shelter:", err.message);
      } else {
        console.log(`Inserted shelter with ID: ${this.lastID}`);
      }
    }
  );
});

// Close DB connection
db.close();
