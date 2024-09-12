import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainList = ({ onSelectTrain }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch the list of trains
    const fetchTrains = async () => {
      try {
        // Replace with your actual endpoint for listing trains
        const response = await axios.get("http://localhost:3000/services/api/trains");
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains", error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>Train List</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainId} onClick={() => onSelectTrain(train.trainId)}>
            {train.trainId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
