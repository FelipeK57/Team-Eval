import "./Grupos.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import PropTypes from "prop-types";
import GruposCard from "../../components/GruposCard";
import GruposCard1 from "../../components/GruposCard1";
import GruposCard3 from "../../components/GruposCard3";
import Button2 from "../../components/Utilities/Button2";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Grupos(props) {
    const [codigo, setCodigo] = useState(Cookies.get("codigo"));
    const [nombre, setNombre] = useState(Cookies.get("nombre"));
    const [curso, setCurso] = useState(null);
    const [estudiantesSinGrupo, setEstudiantesSinGrupo] = useState([]);
    const [estudiantesEnGrupo, setEstudiantesEnGrupo] = useState([]);
    const [estudiantesGrupo, setEstudiantesGrupo] = useState([]);
    const [estudiantesGrupito, setEstudiantesGrupito] = useState([]);

    useEffect(() => {
        const fetchCurso = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/Cursos/", { codigo: codigo }
                );
                setCurso(response.data.curso);
                if (response.data.curso) {
                    const estudiantesEnGrupo = response.data.curso.grupos.reduce((accumulator, grupo) => {
                        return [...accumulator, ...grupo.estudiantes];
                    }, []);
                    const estudiantesCurso = response.data.curso.estudiantes;
                    const estudiantesSinGrupo = estudiantesCurso.filter(estudiante => !estudiantesEnGrupo.includes(estudiante));
                    setEstudiantesSinGrupo(estudiantesSinGrupo);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };
        fetchCurso();
    }, [codigo]);

    useEffect(() => {
        const fetchEstudiantesEnGrupo = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/CursosGrupo/", { codigo: codigo }
                );
                if (response.data.curso) {
                    const estudiantesGrupito = response.data.curso.grupos.reduce((accumulator, grupo) => {
                        return [...accumulator, ...grupo.estudiantes];
                    }, []);
                    const estudiantesCurso = response.data.curso.estudiantes;
                    const estudiantesGrupo = response.data.curso.grupos.estudiantes;
                    setEstudiantesGrupo(estudiantesGrupo);
                    console.log("Estudiantes grupo:", estudiantesGrupito);
                }
            } catch (error) {
                console.error("Error al obtener los estudiantes en grupo:", error);
            }
        };
        fetchEstudiantesEnGrupo();
    }, [codigo]);

    

    

    const handleSelectedTeam = (selectedGroup) => {
        if (selectedGroup) {
            setEstudiantesGrupito(selectedGroup.estudiantes);
        }
    };

    const handleEliminarEstudiante = (estudiante) => {
        setEstudiantesEnGrupo(estudiantesGrupo.filter(e => e !== estudiante));
    };

    return (
        <div className="Grupos">
            <NavbarProfesor />
            <div className="holi"><h1>Configuración del curso<br /><b>{props.materia}</b></h1></div>
            <div className="hola"><h1>Grupos del Curso</h1></div>
            <div className="holo">
                <GruposCard titulo="Integrantes" estudiantes={estudiantesGrupito} eliminar={handleEliminarEstudiante} />
            </div>
            <div className="holu">
                <GruposCard1 grupos={curso ? curso.grupos : []} onSelectTeam={handleSelectedTeam} />
            </div>
            <div className="lel">
                <GruposCard3 estudiantesSinGrupo={estudiantesSinGrupo} />
            </div>
            <div className="conio">
                <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" width="250px" />
            </div>
        </div>
    )
}

Grupos.propTypes = {
    materia: PropTypes.string.isRequired
};

export default Grupos;
