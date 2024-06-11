import React, { useState, useEffect } from 'react';
import "./AsignarEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Teams from "../../components/Teams";
import Button2 from "../../components/Utilities/Button2";
import DropDown from "../../components/DropDown";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";

function AsignarEva(props) {
    const [grupos, setGrupos] = useState([]);  
    const [grupoIdSeleccionado, setGrupoIdSeleccionado] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const { evaluacionid } = useParams();

    AsignarEva.propTypes = {
        eva: PropTypes.string.isRequired,
        combi: PropTypes.string.isRequired
    }

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/grupos_curso/", 
                    { id: evaluacionid }
                );
                setGrupos(response.data.grupos);
            } catch (error) {
                console.error("Error al obtener los grupos  ", error);
            }
        };
        fetchGrupos();
    }, [evaluacionid]); 

    const handleSelectTeam = async (id) => {
        setGrupoIdSeleccionado(id);
        try {
            const response = await axios.post(
                "http://localhost:8000/estudiantes_grupos/",
                { id: id }
            );
            setEstudiantes(Array.isArray(response.data.estudiantes) ? response.data.estudiantes : []);
        } catch (error) {
            console.error("Error al obtener los estudiantes  ", error);
        }
    };

    return (
        <div className="AsignarEva">
            <div className="michi">
                <NavbarProfesor />
            </div>
            <div className="titus">
                <div className="tienda"><h1>Elija la rubrica de evaluación</h1></div>
                <div className="pichin"><h1>Editar evaluación <br /><b>{props.eva}</b></h1></div>
            </div>
            <div className="desple"><DropDown /></div>
            <div className="titu"><h1>Grupos que van a ser evaluados</h1></div>
            <div className="tables">
                <div className="table-izq">
                    <Teams grupos={grupos} onSelectTeam={handleSelectTeam} />
                </div>
                <div className="gorila">
                    <div className="god">
                        <h1>Integrantes</h1>
                    </div>
                    {estudiantes.map((estudiante) => (
                    <div key={estudiante.user.id} className="zilla">
                        <h1>{estudiante.user.first_name + ' ' + estudiante.user.last_name}</h1>
                    </div>
                    ))}
                </div>
            </div>
            <div className="buttons-row">
                <div className="button-container">
                    <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" width="250px" />
                </div>
                <div className="button-container">
                    <Button2 Boton2="gestionar grupos" color="rgb(15, 65, 118)" fontColor="white" width="250px" />
                </div>
            </div>
        </div>
    );
}

export default AsignarEva;
