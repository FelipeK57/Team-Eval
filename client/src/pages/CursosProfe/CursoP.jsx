import "./CursoP.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import Cookies from "js-cookie";
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CursosProfe() {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchTeacherCourses = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/teacher_courses/",
                    {
                        identificacion: Cookies.get("identificacion"),
                    }
                );
                console.log("Nombre del profesor:", Cookies.get("user"));
                setCursos(response.data.cursos);
            } catch (error) {
                console.error("Error al obtener los cursos del profesor:", error);
            }
        };
        fetchTeacherCourses();
    }, []);

    const handleSettingsClick = (codigo, nombre) => {
        Cookies.set("codigo", codigo, { expires: 1 });
        Cookies.set("nombre", nombre, { expires: 1 });
        navigate("/Grupos"); 
    };


    return (
        <div className="CursosProfe">
            <NavbarProfesor />
            <div className="cursed"><h1>Editar Rubricas <br />Predeterminadas</h1></div>
            <div className="cardex">
                <button>
                    <SettingsIcon sx={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="linea-vertical"></div>
            <div className="cursed2"><h1>Crear Rubrica</h1></div>
            <div className="cardex2">
                <button>
                    <AddIcon sx={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="linea-horizontal"></div>
            <div className="corsel"><h1>Cursos de <b>{Cookies.get("user")}</b></h1></div>
            <div className="cardex3">
                <div className="cardex32"><h1>Ejemplo <br />Completado</h1>
                    <button>
                        <GroupsIcon sx={{ fontSize: 43 }} />
                    </button>
                </div>
                <div className="line-horizonte"></div>
            </div>
            <div className="cardex4">
                {cursos.map((curso) => (
                    <div key={curso.id} className="cardex42"><h1>{curso.nombre}</h1>
                        <button className="button1" onClick={() =>  handleSettingsClick(curso.codigo, curso.nombre)} >
                            <SettingsIcon sx={{ fontSize: 43 }} />
                        </button>
                        <button className="button2" >
                            <GroupsIcon sx={{ fontSize: 43 }} />
                        </button>
                    </div>
                )
                )}
                <div className="line-horizonte"></div>
            </div>
        </div>

    );
}

export default CursosProfe;
