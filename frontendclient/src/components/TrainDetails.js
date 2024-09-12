import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Define the train icon
const trainIcon = new L.Icon({
  iconUrl: "/train-icon.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [1, -25],
  shadowSize: [25, 25],
});

const TrainMap = () => {
  const [trainLocations, setTrainLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchTrainLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/services/api/trains/latest-locations"
        );
        setTrainLocations(response.data);
      } catch (error) {
        console.error("Error fetching train locations", error);
      }
    };

    fetchTrainLocations();
    const interval = setInterval(fetchTrainLocations, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const sriLankaCenter = [7.8731, 80.7718]; // Center of Sri Lanka

  // Filter train locations based on search query
  const filteredLocations = trainLocations.filter((location) =>
    location.trainId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <form onsubmit="event.preventDefault();" role="search"></form>
      <form class="form-container" style={{marginTop:'790px'}}>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autofocus
          required
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <MapContainer
        center={sriLankaCenter}
        zoom={8}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredLocations.map((location) => (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}
            icon={trainIcon}
          >
            <Popup>
              Train ID: {location.trainId}
              <br />
              Last updated: {new Date(location.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrainMap;
