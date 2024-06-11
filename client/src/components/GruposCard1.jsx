import React, { useState, useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

const GruposCard1 = ({ id, onSelectTeam, eliminarGrupo }) => {
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
    <div key={grupo.id} className={`elPapuContainer ${selectedTeam === grupo.nombre ? 'selected' : ''}`}>
      <h1 onClick={() => handleTeamClick(grupo.nombre, grupo.id)}>{grupo.nombre}</h1>
      <button className="elPapuDelete" onClick={() => eliminarGrupo(grupo.id)}>
      <DeleteIcon sx={{ fontSize: 36 }} />
    </button>
  </div>
  ))}

      </div>
    </div>
  );
};

GruposCard1.propTypes = {
  id: PropTypes.string.isRequired,
  onSelectTeam: PropTypes.func.isRequired,
  eliminarGrupo: PropTypes.func.isRequired,
};

export default GruposCard1;
  