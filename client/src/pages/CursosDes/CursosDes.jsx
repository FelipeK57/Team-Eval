import "./CursosDes.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Label from "../../components/label";


function CursosDes() {
    return (
        <div className="CursosDes">
            <NoQuieroCrearMasNavbars />
            <div className="palmira"><h1>Cursos Deshabilitados</h1></div>
            <div className="yumbo">
                <Label Nombre="Nombre" Codigo="Codigo" />
            </div>
        </div>
    );
}

export default CursosDes;