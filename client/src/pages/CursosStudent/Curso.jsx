import "./Curso.css";
import NavbarStudent from "../../components/NavbarStudent";
import Button2 from "../../components/Utilities/Button2";

function CursosStudent() {

    return (
        <div className="Curso"> 
            <NavbarStudent />
            <div className="cursi"><h1>Cursos de <b>Ejemplo</b></h1></div>
            <div className="cardi">
            <div className="cardi12"><h1>Ejemplo Completado</h1></div> 
            <div className="cardi13"><h1>¡Terminado!</h1></div> 
            </div>
            <div className="cardi2">
            <div className="cardi22"><h1>Ejemplo por Completar</h1></div> 
            <div className="cardi23">
                <Button2 Boton2="Ir" color="white" fontColor="black" width="150px"/>
            </div>
            </div>
        </div>

    )
}

export default CursosStudent