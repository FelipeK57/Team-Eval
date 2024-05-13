import NavBar from "../../components/NavBar";
import CardForm from "../../components/CardForm";

function AgregarProfesor() {
    return (
        <div className="Contenedor">
            <NavBar />
            <CardForm Title="Agregar Profesor"
                Label1="Nombres"
                Label2="Apellidos"
                Label3="Documento"
                Label4="Correo"
            />
        </div>
    );
}

export default AgregarProfesor