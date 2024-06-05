import React, { useState } from 'react';
import Team from './Team.jsx';
import './Utilities/Team.css';

const GruposCard1 = ({ grupos, onSelectTeam }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    onSelectTeam(team);
  };

  return (
    <div className="teams-container">
      <div className="cabeza">
        <h1>Equipos</h1>
      </div>
      {grupos.map((grupo) => (
        <Team
          key={grupo.id}
          name={grupo.nombre}
          isSelected={selectedTeam === grupo}
          onSelect={() => handleTeamClick(grupo)}
        />
      ))}
    </div>
  );
};

export default GruposCard1;
