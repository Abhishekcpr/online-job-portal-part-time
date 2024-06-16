import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Modal from "react-modal";

const Maps = (source, dest) => {
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
 

//   const start = { lat: 26.759518683020854, lng: 83.42972514397123 };
//   const end = { lat: 26.73164986689305, lng: 83.43312759582115 };

const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (map) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: source,
          destination: dest,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);

            const route = response.routes[0].legs[0];
            setDistance(route.distance.text);
            setDuration(route.duration.text);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [map]);



  return (
    
    <>
         
        {distance && duration && (
        <div>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GEO_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "70vh", width: "70vw" }}
        center={source}
        zoom={7}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
        }}
      />
    </LoadScript>
   
    </>
    
  );
};

export default Maps;
