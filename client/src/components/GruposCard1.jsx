import React, { useState } from 'react';
import Team from './Team.jsx';
import './Utilities/Team.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const GruposCard1 = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="teams-container">
      <div className="cabeza">
        <h1>Equipos</h1>
      </div>
      <Team
        name="TeamEval 1"
        isSelected={selectedTeam === 'TeamEval 1'}
        onSelect={handleTeamClick}
      />
      <Team
        name="TeamEval 2"
        isSelected={selectedTeam === 'TeamEval 2'}
        onSelect={handleTeamClick}
      />
     
 
    </div>
  );
};

export default GruposCard1;

