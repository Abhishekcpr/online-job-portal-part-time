import React from 'react';

const MapButton = ({ source, destination }) => {
  const handleClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <button onClick={handleClick}>Open Map</button>
  );
};

export default MapButton;
