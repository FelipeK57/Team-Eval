import NavbarProfesor from "../../components/NavbarProfesor"
import "./SeleccionarRubrica.css"
import PropTypes from "prop-types"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import RubricaSeleccionable from "./RubricaSeleccionable";
import Button from "../../components/Utilities/Button";
function SeleccionarRubrica(props) {

    SeleccionarRubrica.propTypes = {
        RubricaSeleccionada: PropTypes.string.isRequired,
        CambiarRubrica: PropTypes.func.isRequired,
        materia: PropTypes.string.isRequired
    }

    const [box, setBox] = useState(false);

    return (
        <div className="SeleccionarRubricaContenedor">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="SeleccionarRubricaTitle">
                <div className="CursoSeleccionarRubrica"><h1>Configuración del curso<br /><b>{props.materia}</b></h1></div>
                <div className="TitleSeleccionarRubrica"><h1>Asignar rubrica al curso</h1></div>
            </div>
            <div className="SeleccionarRubrica">
                <div className={box ? "BoxRubricas Deployed" : "BoxRubricas UnDeployed"}>
                    <h2>{props.RubricaSeleccionada ? props.RubricaSeleccionada : "Escoger una rubrica de evaluación"}</h2>
                    <button className="ButtonRubricas" onClick={() => setBox(!box)}>
                        <ArrowDropDownIcon sx={{ fontSize: 50, color: "white", rotate: box ? "180deg" : "0deg", transition: "all 0.3s ease-in-out" }} />
                    </button>
                </div>
                <div className={box ? "ListaRubricas ShowListRubricas" : "ListaRubricas HideListRubricas"}>
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo1" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo2" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo3" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo4" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo5" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo6" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo7" />
                    <RubricaSeleccionable NombreRubrica="Rubrica de ejemplo8" />
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