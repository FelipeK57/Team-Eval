import "./ProfeDes.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Label from "../../components/label";


function ProfeDes() {
    return (
        <div className="ProfeDes">
            <NoQuieroCrearMasNavbars />
            <div className="cali"><h1>Profesores Deshabilitados</h1></div>
            <div className="corinto">
                <Label Nombre="Asignatura" Codigo="Profesor" />
            </div>
        </div>
    );
}

export default ProfeDes;