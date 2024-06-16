import React, { useState } from 'react'


const getCurrentLocation = async(setAddress, setCoord) => {
 
    // const [location, setLocation] = useState({});
    // let address = 'address not found';

   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("the location", latitude,longitude);  
            setCoord({latitude: latitude.toString(),longitude:longitude.toString()});
            // setLocation({ latitude, longitude });
  
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GEO_API_KEY}`
              );
              if (!response.ok) {
                
                throw new Error('Error fetching address data');
              }
              const data = await response.json();

             
              if (data.results.length > 0) {
                // console.log("coord: ",latitude," ",longitude);
                console.log("your location:", data.results[0].formatted_address);
               setAddress(data.results[0].formatted_address);
               
               return "success"
              }
            } catch (error) {
              return (error.message);
            }
          },
          (error) => {
            console.log("eror", error);
            
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }

      
   
  
}

export default getCurrentLocation;