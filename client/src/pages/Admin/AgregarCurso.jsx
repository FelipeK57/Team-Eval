import CardForm from "../../components/CardForm";
import NavBar from "../../components/NavBar";

function AgregarCurso() {
    return (
        <div className="Contenedor">
            <NavBar />
            <CardForm Title="Agregar Cursos"
                Label1="Nombre"
                Label2="Codigo"
                Label3="Profesor"
                Label4="Año"
                Label5="Semestre"
                Combo={true}
                />
        </div>
        
    );
}

export default AgregarCurso;