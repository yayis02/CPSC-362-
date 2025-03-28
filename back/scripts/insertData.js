// insertData.js
const db = require("../db/database");
//resources
//https://thefreebieguy.com/complete-list-of-resources-for-those-impacted-by-the-california-wildfires/

const shelters = [
    {
      name: "Salvation Army Riverside Corps",
      address: "3695 1st Street",
      city: "Riverside",
      state: "CA",
      zip: "92501",
      latitude: 33.9845,
      longitude: -117.3694,
      services: "Emergency Shelter"
    },
    {
      name: "Westwood Recreation Center",
      address: "1350 S Sepulveda Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90025",
      latitude: 34.05345,
      longitude: -118.44849,
      services: "Emergency Shelter"
    },
    {
      name: "El Camino Real Charter High School",
      address: "5440 Valley Circle Blvd",
      city: "Woodland Hills",
      state: "CA",
      zip: "91367",
      latitude: 34.16972,
      longitude: -118.64306,
      services: "Emergency Shelter"
    },
    {
      name: "Pasadena Civic Auditorium",
      address: "300 E Green St",
      city: "Pasadena",
      state: "CA",
      zip: "91101",
      latitude: 34.14424,
      longitude: -118.14425,
      services: "Emergency Shelter"
    },
    {
      name: "Ritchie Valens Recreation Center",
      address: "10736 Laurel Canyon Blvd",
      city: "Pacoima",
      state: "CA",
      zip: "91331",
      latitude: 34.26595,
      longitude: -118.43881,
      services: "Emergency Shelter"
    },
    {
      name: "Pomona Fairplex",
      address: "1101 W McKinley Ave",
      city: "Pomona",
      state: "CA",
      zip: "91768",
      latitude: 34.08114,
      longitude: -117.76657,
      services: "Emergency Shelter"
    },
    {
      name: "Pan Pacific Recreational Center",
      address: "7600 Beverly Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90036",
      latitude: 34.07568,
      longitude: -118.35427,
      services: "Emergency Shelter"
    },
    {
      name: "Glendale Civic Center",
      address: "613 E Broadway",
      city: "Glendale",
      state: "CA",
      zip: "91206",
      latitude: 34.14712,
      longitude: -118.24789,
      services: "Emergency Shelter"
    },
    {
      name: "Hamilton High School",
      address: "57430 Mitchell Rd",
      city: "Anza",
      state: "CA",
      zip: "92539",
      latitude: 33.57277,
      longitude: -116.65888,
      services: "Emergency Shelter"
    },
    {
      name: "LA Dream Center Emergency Shelter",
      address: "2301 Bellevue Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90025",
      latitude: 34.07469,
      longitude: -118.26953,
      services: "Emergency Shelter, Food Banks"
    },
    {
      name: "FEMA Disaster Recovery Center (DRC)",
      address: "540 W Woodbury Rd",
      city: "Altadena",
      state: "CA",
      zip: "91001",
      latitude: 34.18267,
      longitude: -118.16217,
      services: "Emergency Shelter, Food Banks"
    },
    {
      name: "Salvation ArmyCorps",
      address: "1450 Powell St",
      city: "San Francisco",
      state: "CA",
      zip: "94133",
      latitude: 37.798019,
      longitude: -122.410126,
      services: "Emergency Shelter"
    },
    {
      "name": "Los Angeles Regional Food Bank",
      "address": "1734 E 41st St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90058",
      "latitude": 34.007599,
      "longitude": -118.241749,
      "services": "Food Bank"
    },
    {
      "name": "San Francisco-Marin Food Bank",
      "address": "900 Pennsylvania Ave",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94107",
      "latitude": 37.754100,
      "longitude": -122.393400,
      "services": "Food Bank"
    },
    {
      "name": "Second Harvest of Silicon Valley",
      "address": "750 Curtner Ave",
      "city": "San Jose",
      "state": "CA",
      "zip": "95125",
      "latitude": 37.291822,
      "longitude": -121.877074,
      "services": "Food Bank"
    },
    {
      "name": "Alameda County Community Food Bank",
      "address": "7900 Edgewater Dr",
      "city": "Oakland",
      "state": "CA",
      "zip": "94621",
      "latitude": 37.737900,
      "longitude": -122.207940,
      "services": "Food Bank"
    },
    {
      "name": "Food Bank of Contra Costa and Solano",
      "address": "4010 Nelson Ave",
      "city": "Concord",
      "state": "CA",
      "zip": "94520",
      "latitude": 37.978000,
      "longitude": -122.031100,
      "services": "Food Bank"
    },
    {
      "name": "Second Harvest Food Bank of Orange County",
      "address": "8014 Marine Way",
      "city": "Irvine",
      "state": "CA",
      "zip": "92618",
      "latitude": 33.700000,
      "longitude": -117.750000,
      "services": "Food Bank"
    },
    {
      "name": "Jacobs & Cushman San Diego Food Bank",
      "address": "9850 Distribution Ave",
      "city": "San Diego",
      "state": "CA",
      "zip": "92121",
      "latitude": 32.880000,
      "longitude": -117.175000,
      "services": "Food Bank"
    },
    {
      "name": "Redwood Empire Food Bank",
      "address": "3990 Brickway Blvd",
      "city": "Santa Rosa",
      "state": "CA",
      "zip": "95403",
      "latitude": 38.514030,
      "longitude": -122.792570,
      "services": "Food Bank"
    },
    {
      "name": "Food Bank for Monterey County",
      "address": "353 W Rossi St",
      "city": "Salinas",
      "state": "CA",
      "zip": "93907",
      "latitude": 36.685000,
      "longitude": -121.659000,
      "services": "Food Bank"
    },
    {
      "name": "Foodbank of Santa Barbara County",
      "address": "4554 Hollister Ave",
      "city": "Santa Barbara",
      "state": "CA",
      "zip": "93110",
      "latitude": 34.439130,
      "longitude": -119.766600,
      "services": "Food Bank"
    },
    {
      "name": "Feeding America Riverside | San Bernardino",
      "address": "2950 Jefferson St Ste B",
      "city": "Riverside",
      "state": "CA",
      "zip": "92504",
      "latitude": 33.906070,
      "longitude": -117.398540,
      "services": "Food Bank"
    },
    {
      "name": "Food Share of Ventura County",
      "address": "4156 Southbank Rd",
      "city": "Oxnard",
      "state": "CA",
      "zip": "93036",
      "latitude": 34.249110,
      "longitude": -119.159770,
      "services": "Food Bank"
    },
    {
      "name": "Central California Food Bank",
      "address": "4010 E Amendola Dr",
      "city": "Fresno",
      "state": "CA",
      "zip": "93725",
      "latitude": 36.660000,
      "longitude": -119.734000,
      "services": "Food Bank"
    },
    {
      "name": "Laguna Food Pantry",
      "address": "20652 Laguna Canyon Rd",
      "city": "Laguna Beach",
      "state": "CA",
      "zip": "92651",
      "latitude": 33.572000,
      "longitude": -117.753000,
      "services": "Food Pantry"
    },
    {
      "name": "Community Food Bank of San Benito County",
      "address": "1133 San Felipe Rd",
      "city": "Hollister",
      "state": "CA",
      "zip": "95023",
      "latitude": 36.872000,
      "longitude": -121.400000,
      "services": "Food Bank"
    },
    {
      "name": "Union Rescue Mission",
      "address": "545 S San Pedro St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90013",
      "latitude": 34.043334,
      "longitude": -118.245058,
      "services": "Homeless Shelter"
    },
    {
      "name": "The Midnight Mission",
      "address": "601 S San Pedro St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90014",
      "latitude": 34.042400,
      "longitude": -118.245300,
      "services": "Homeless Shelter"
    },
    {
      "name": "Los Angeles Mission",
      "address": "303 E 5th St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90013",
      "latitude": 34.045000,
      "longitude": -118.247000,
      "services": "Homeless Shelter"
    },
    {
      "name": "San Diego Rescue Mission",
      "address": "120 Elm St",
      "city": "San Diego",
      "state": "CA",
      "zip": "92101",
      "latitude": 32.722000,
      "longitude": -117.164000,
      "services": "Homeless Shelter"
    },
    {
      "name": "Father Joe's Villages (St. Vincent de Paul Village)",
      "address": "1501 Imperial Ave",
      "city": "San Diego",
      "state": "CA",
      "zip": "92101",
      "latitude": 32.707000,
      "longitude": -117.150000,
      "services": "Homeless Shelter"
    },
    {
      "name": "Sacramento Loaves & Fishes",
      "address": "1351 North C St",
      "city": "Sacramento",
      "state": "CA",
      "zip": "95811",
      "latitude": 38.598000,
      "longitude": -121.486000,
      "services": "Homeless Services"
    },
    {
      "name": "Good News Rescue Mission",
      "address": "2842 S Market St",
      "city": "Redding",
      "state": "CA",
      "zip": "96001",
      "latitude": 40.586000,
      "longitude": -122.392000,
      "services": "Homeless Shelter"
    },
    {
      "name": "Coachella Valley Rescue Mission",
      "address": "47-470 Van Buren St",
      "city": "Indio",
      "state": "CA",
      "zip": "92201",
      "latitude": 33.720577,
      "longitude": -116.215561,
      "services": "Homeless Shelter"
    },
    {
      "name": "Orange County Rescue Mission (Village of Hope)",
      "address": "1 Hope Dr",
      "city": "Tustin",
      "state": "CA",
      "zip": "92782",
      "latitude": 33.729000,
      "longitude": -117.798000,
      "services": "Homeless Shelter"
    },
    {
      "name": "St. Anthony Foundation Dining Room",
      "address": "121 Golden Gate Ave",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94102",
      "latitude": 37.782000,
      "longitude": -122.414000,
      "services": "Free Meals"
    },
    {
      "name": "Union Station Homeless Services – Adult Center",
      "address": "412 S Raymond Ave",
      "city": "Pasadena",
      "state": "CA",
      "zip": "91105",
      "latitude": 34.142000,
      "longitude": -118.148000,
      "services": "Homeless Shelter"
    },
    {
      "name": "The Salvation Army Bell Shelter",
      "address": "5600 Rickenbacker Rd, Bldg 2A",
      "city": "Bell",
      "state": "CA",
      "zip": "90201",
      "latitude": 33.989726,
      "longitude": -118.169908,
      "services": "Homeless Shelter"
    },
    {
      "name": "Homeward Bound of Marin – New Beginnings Center",
      "address": "1399 N Hamilton Pkwy",
      "city": "Novato",
      "state": "CA",
      "zip": "94949",
      "latitude": 38.065760,
      "longitude": -122.531720,
      "services": "Homeless Shelter"
    },
    {
      "name": "Bakersfield Homeless Center",
      "address": "1600 E Truxtun Ave",
      "city": "Bakersfield",
      "state": "CA",
      "zip": "93305",
      "latitude": 35.389890,
      "longitude": -118.985150,
      "services": "Homeless Shelter"
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