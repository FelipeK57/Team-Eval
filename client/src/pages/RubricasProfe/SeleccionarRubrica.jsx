import NavbarProfesor from "../../components/NavbarProfesor"
import "./SeleccionarRubrica.css"
import PropTypes from "prop-types"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import RubricaSeleccionable from "./RubricaSeleccionable";
import Button from "../../components/Utilities/Button";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
function SeleccionarRubrica(props) {

    SeleccionarRubrica.propTypes = {
        RubricaSeleccionada: PropTypes.string.isRequired,
        CambiarRubrica: PropTypes.func.isRequired,
        materia: PropTypes.string.isRequired
    }

    const [box, setBox] = useState(false);
    const [rubricas, setRubricas] = useState([]);
    const [predeterminada, setPredeterminada] = useState([]);

    useEffect(() => {
        const fetchestudiantes= async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/rubricasProfe/", 
                    { identificacion : Cookies.get("identificacion") }    
                );
                setRubricas(response.data.rubricas);
                setPredeterminada(response.data.predeterminada);
            } catch (error) {
                console.error("Error al obtener las rúbricas  ", error);
            }
        };
        fetchestudiantes();
    }, []);


    return (
        <div className="SeleccionarRubricaContenedor">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="SeleccionarRubricaTitle">
                <div className="CursoSeleccionarRubrica"><h1>Configuración del curso<br /><b>{props.materia}</b></h1></div>
                <div className="TitleSeleccionarRubrica"><h1>Asignar rúbrica al curso</h1></div>
            </div>
            <div className="SeleccionarRubrica">
                <div className={box ? "BoxRubricas Deployed" : "BoxRubricas UnDeployed"}>
                    <h2>{props.RubricaSeleccionada ? props.RubricaSeleccionada : "Escoger una rúbrica de evaluación"}</h2>
                    <button className="ButtonRubricas" onClick={() => setBox(!box)}>
                        <ArrowDropDownIcon sx={{ fontSize: 50, color: "white", rotate: box ? "180deg" : "0deg", transition: "all 0.3s ease-in-out" }} />
                    </button>
                </div>
                <div className={box ? "ListaRubricas ShowListRubricas" : "ListaRubricas HideListRubricas"}>
                    {rubricas.map((rubrica) => (
                        <RubricaSeleccionable key={rubrica.id} NombreRubrica={rubrica.nombre} />
                    ))}
                    <RubricaSeleccionable NombreRubrica={predeterminada.nombre} />
                   
                    
                </div>
            </div>
            <div className="BotonSeleccionarRubrica">
                <Button
                    Boton="Terminar"
                    color="rgb(15, 65, 118)"
                    fontColor="white"/>
            </div>
        </div>
    )
}

export default SeleccionarRubrica