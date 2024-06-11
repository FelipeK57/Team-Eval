import React, { useState } from 'react';
import './Utilities/Teams.css';

const Bean = ({ name, isSelected, onSelect }) => {
  return (
    <div className={`bean ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(name)}>
      <h1>{name}</h1>
    </div>
  );
};

const Teams = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleTeamClick = (bean) => {
    setSelectedTeams(prevSelectedTeams =>
      prevSelectedTeams.includes(bean)
        ? prevSelectedTeams.filter(t => t !== bean)
        : [...prevSelectedTeams, bean]
    );
  };

  return (
    <div className="epa">
      <div className="colombia">
        <h1>Equipos</h1>
      </div>
      <div className='listoCalisto'>
      <Bean
        name="TeamEval 1"
        isSelected={selectedTeams.includes('TeamEval 1')}
        onSelect={handleTeamClick}
      />
      <Bean
        name="TeamEval 2"
        isSelected={selectedTeams.includes('TeamEval 2')}
        onSelect={handleTeamClick}
      />
      </div>
    </div>
  );
};

export default Teams;