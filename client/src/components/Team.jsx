import React from 'react';
import "./Utilities/Team.css";

const Team = ({ name, isSelected, onSelect }) => {
  return (
    <div
      className={`team ${isSelected ? 'selected' : ''}`}
      onClick={onSelect} // Llamamos a onSelect directamente
    >
      <h1>{name}</h1>
    </div>
  );
};

export default Team;
