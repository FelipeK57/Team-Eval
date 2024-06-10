import React, { useState, useEffect } from 'react';
import Team from './Team.jsx';
import './Utilities/Team.css';
import axios from "axios";
import PropTypes from 'prop-types';

const GruposCard1 = ({ id, onSelectTeam }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [grupos, setGrupos] = useState([]);   

  const handleTeamClick = (team, grupoId) => {
    setSelectedTeam(team);
    onSelectTeam(grupoId);
  };

  useEffect(() => {
    const fetchRubrica = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/grupos_curso/", 
                { id: id }
            );
            setGrupos(response.data.grupos);
        } catch (error) {
            console.error("Error al obtener los grupos  ", error);
        }
    };
    fetchRubrica();
  }, [id]); 

  return (
    <div className="teams-container">
      <div className="cabeza">
        <h1>Equipos</h1>
      </div>
      <div className="teams-list">
        {grupos.map((grupo) => (
          <Team
            key={grupo.id}
            name={grupo.nombre}
            isSelected={selectedTeam === grupo.nombre}
            onSelect={() => handleTeamClick(grupo.nombre, grupo.id)}
          />
        ))}
      </div>
    </div>
  );
};

GruposCard1.propTypes = {
  id: PropTypes.string.isRequired,
  onSelectTeam: PropTypes.func.isRequired
};

export default GruposCard1;
