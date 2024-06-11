import Button from "../../components/Utilities/Button";
import NavbarProfesor from "../../components/NavbarProfesor";
import "./GruposInformesProfe.css";
import CursoModelo from "../../components/CursoModulo";
import PropTypes from "prop-types";

function IntegrantesInformesProfe(props) {

    IntegrantesInformesProfe.propTypes = {
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
                    <h1>{props.NombreMateria}</h1>
                </div>
                <div className="GruposInformesProfeBody">
                    <h1 className="GruposInformesProfeBodyTitle">Integrantes</h1>
                    <div className="GruposInformesProfeCard">
                        <CursoModelo name="Nombre del integrante" state={true} />
                        <CursoModelo name="Nombre del integrante 2" state={true} />
                        <CursoModelo name="Juancho" state={true} />
                        <CursoModelo name="Kevin" state={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntegrantesInformesProfe;