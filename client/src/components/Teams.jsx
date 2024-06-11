import React, { useState } from 'react';
import './Utilities/Teams.css';

const Bean = ({ name, isSelected, onSelect }) => {
  return (
    <div className={`bean ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h1>{name}</h1>
    </div>
  );
};

const Teams = ({ grupos, onSelectTeam }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (id) => {
    setSelectedTeam(id);
    onSelectTeam(id);
  };

  return (
    <div className="epa">
      <div className="colombia">
        <h1>Equipos</h1>
      </div>
      <div className='listoCalisto'>
        {grupos.map(grupo => (
          <Bean
            key={grupo.id}
            name={grupo.nombre}
            isSelected={selectedTeam === grupo.id}
            onSelect={() => handleTeamClick(grupo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;

