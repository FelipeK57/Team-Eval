import React, { useState, useEffect } from 'react';
import "./AsignarEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Teams from "../../components/Teams";
import Button2 from "../../components/Utilities/Button2";
import DropDown from "../../components/DropDown";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopUp from '../../components/Utilities/PopUp';

function AsignarEva(props) {
    const [grupos, setGrupos] = useState([]);  
    const [grupoIdSeleccionado, setGrupoIdSeleccionado] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [rubricaNombre, setRubricaNombre] = useState("");
    const [rubrica, setRubrica] = useState("");
    const [nombreEva, setNombreEva] = useState("");
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    const navigate = useNavigate();
    const { evaluacionid } = useParams();
    const { cursoId } = useParams();
    const [iniciada, setIniciada] = useState(false);

    AsignarEva.propTypes = {
        eva: PropTypes.string.isRequired,
        combi: PropTypes.string.isRequired
    }

    
    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/rubrica_evaluacion/", 
                    { idEva: evaluacionid }
                );
                setRubricaNombre(response.data.evaluacion.rubrica.nombre);
                setNombreEva(response.data.evaluacion.nombre);
                setIniciada(response.data.iniciado);
            } catch (error) {
                console.error("Error al obtener los grupos  ", error);
            }
        };
        fetchGrupos();
    }, [evaluacionid]); 

    const handleClick = async () => {
        if (!rubrica) {
            navigate(-1)
        }
        try {
            const response = await axios.post(
                "http://localhost:8000/editar_eva/", 
                { 
                    idEva: evaluacionid,
                    idRubrica: rubrica
                }
            );
            setAdvice(response.data.message);
            setOpen(true);
           
        } catch (error) {
            console.error("Error al asignar la evaluación  ", error);
        }
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

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
        navigate(-1)
    };

    const handleSelectRubrica = (id, nombre) => {
        setRubrica(id);
        setRubricaNombre(nombre);
    };

    const gestionar = () => {
        navigate(`/Grupos/${evaluacionid}/${cursoId}`, { state: { materia: nombreEva } });
    }



    return (
        <div className="AsignarEva">
            <div className="michi">
                <NavbarProfesor />
            </div>
            <div className="titus">
                <div className="tienda"><h1>Elija la rubrica de evaluación</h1></div>
                <div className="pichin"><h1>Editar evaluación <br /><b>{nombreEva}</b></h1></div>
            </div>
            <div className="desple"><DropDown  evaSeleccionada={rubricaNombre} onSelectRubrica={handleSelectRubrica}/></div>
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
            {iniciada ? (
                <div className="mensaje-evaluacion-iniciada">
                    <h2>Evaluación iniciada, no se pueden editar los parámetros</h2>
                </div>
            ) : (
                <div className="buttons-row">
                    <div className="button-container">
                        <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" width="300px" onClick={handleClick} />
                    </div>
                    <div className="button-container">
                        <Button2 Boton2="Gestionar Grupos" color="rgb(15, 65, 118)" fontColor="white" width="300px" onClick={gestionar} />
                    </div>
                </div>
            )}
            <div>
                <PopUp open={open}
                    SetOpen={setOpen}
                    Advice={advice}
                    Width={"100%"}
                    Button1="volver"   
                    onClick1={popup}
                />
            </div>
        </div>
    );
}

export default AsignarEva;

