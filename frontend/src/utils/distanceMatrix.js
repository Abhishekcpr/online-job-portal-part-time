import React, { useState } from "react";

const DistanceMatrix = async (activeWorkers, setActiveWorkers) => {
  const myId = localStorage.getItem("login_id");
  console.log(activeWorkers);

  let source, destinations = [];
  const newActiveWorkers = activeWorkers ;

  activeWorkers.forEach((worker) => {
    if (worker._id === myId) {
      source = { _id: worker._id, coord: worker.locationCoord };
    } else if (worker.locationCoord.length === 2) {
      destinations.push({
        _id: worker._id,
        coord: worker.locationCoord,
        distance: 0,
      });
    }
  });

  console.log("source ", source);
  console.log("destination ", destinations);

  if (!source || !destinations || destinations.length === 0) {
    throw new Error("API key, source, and at least one destination are required.");
  }

  const destinationsString = destinations.map(
    (dest) => `${dest.coord[0]},${dest.coord[1]}`
  ).join("|");

  const apiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source.coord[0]},${source.coord[1]}&destinations=${destinationsString}&key=${process.env.REACT_APP_GEO_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log("Network response was not ok");
      return; // Exit function early on network error
    }

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Error in Google Maps API response:", data.status);
      return; // Exit function early on API error
    }

    console.log("everything: ", data);
    const updatedDestinations = destinations.map((dest, index) => {
      const shortDistance = data.rows[0]?.elements[index]?.distance?.value;
      return { ...dest, shortDistance };
    });

    console.log("the destination", updatedDestinations);

    if(updatedDestinations)
     {
       for(let x = 0 ; x < updatedDestinations.length ; x++)
        {
           for(let y = 0 ; y < newActiveWorkers.length ; y++)
            {
              if(updatedDestinations[x]._id == newActiveWorkers[y]._id)
                {
                  newActiveWorkers[y].distance = updatedDestinations[x].shortDistance
                }
            }
        }
     }
      setActiveWorkers(newActiveWorkers)
    // Use updatedDestinations here (e.g., setActiveWorkers(updatedWorkers))
  } catch (error) {
    console.error("Error fetching distances:", error);
  }
};

export default DistanceMatrix;