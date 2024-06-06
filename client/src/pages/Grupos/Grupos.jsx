import "./Grupos.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import PropTypes from "prop-types";
import GruposCard from "../../components/GruposCard";
import GruposCard1 from "../../components/GruposCard1";
import GruposCard3 from "../../components/GruposCard3";
import Button2 from "../../components/Utilities/Button2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Grupos(props) {
    const { cursoId } = useParams();
    const [cursos, setCursos] = useState([]);   
    const [profesor, setProfesor] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);

    Grupos.propTypes = {
        materia: PropTypes.string.isRequired
    }

    const navigate = useNavigate();

    const SeleccionarRubrica = () => {
        navigate("/SeleccionarRubrica");
    }

    const handleSelectdTeam =  async (id) => {   
        try {
            const response = await axios.post(
                "http://localhost:8000/estudiantes_grupos/", 
                { id : id}
            );
            setEstudiantes(response.data.estudiantes);
        } catch (error) {
            console.error("Error al obtener los estudiantes  ", error);
        }
    };
    


    useEffect(() => {
        const fetchRubrica = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/cursosProfesor/", 
                    { identificacion: Cookies.get("identificacion") }
                );
                setProfesor(response.data.profesor);
                setCursos(response.data.cursos);
            } catch (error) {
                console.error("Error al obtener los cursos  ", error);
            }
        };
        fetchRubrica();
    }, []);



    return (
        <div className="Grupos">
            <NavbarProfesor />  
            <div className="holi"><h1>Configuración del curso<br/><b>{props.materia}</b></h1></div>     
            <div className="hola"><h1>Grupos del Curso</h1></div>  
            <div className="holo"> 
            <GruposCard titulo="Integrantes" estudiantes = {estudiantes}/>
            </div>
            <div className="holu"> 
            <GruposCard1 id = {cursoId} onSelectTeam={handleSelectdTeam}  />
            </div>
            <div className="lel"> 
            <GruposCard3 estudiante="Miguel Angulo" />
            </div>
            <div className="conio"> 
            <Button2 Boton2="Guardar Cambios" color="rgb(15, 65, 118)" fontColor="white" onClick={SeleccionarRubrica}  />
            </div>
        </div>
    )
}

export default Grupos