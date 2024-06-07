import NavbarProfesor from "../../components/NavbarProfesor"
import "./CalificacionInformesProfe.css"

function CalificacionInformesProfe() {
    return (
        <div className="CalificacionInformesProfeContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="CalificacionInformesProfeTitle">
                <h1>Retroalimentacion</h1>
                <h1 className="CalificacionInformesProfeMateria">Materia</h1>
            </div>
        </div>
    )
}

export default CalificacionInformesProfe