import Button from "../../components/Utilities/Button";
import NavbarProfesor from "../../components/NavbarProfesor";
import "./GruposInformesProfe.css";
import CursoModelo from "../../components/CursoModulo";
import PropTypes from "prop-types";

function GruposInformesProfe(props) {

    GruposInformesProfe.propTypes = {
        Card: PropTypes.string.isRequired,
        NombreMateria: PropTypes.string.isRequired
    }

    return (
        <div className="GruposInformesProfeContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="GruposInformesProfe">
                <div className="GruposInformesProfeTitle">
                    <h1>Informe final</h1>
                    <h1>{props.NombreMateria}Materia</h1>
                </div>
                <div className="GruposInformesProfeBody">
                    <h1 className="GruposInformesProfeBodyTitle">Grupos de trabajo</h1>
                    <div className="GruposInformesProfeCard">
                        <CursoModelo name="Nombre del curso" state={true} />
                        <CursoModelo name="Nombre del curso2" state={false} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                        <CursoModelo name="Español" state={true} />
                    </div>
                    <div className="GruposInformesProfeButton">
                        <Button LineaBoton={false} Boton="Descargar" color="rgb(15, 65, 118)" fontColor="white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GruposInformesProfe;