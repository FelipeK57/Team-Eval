import { Edit } from "@mui/icons-material";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import LargeButton from "../../components/Utilities/LargeButton";
import "./Rubricas.css";

function Rubricas() {

    return (
        <div className="RubricasContainer">
            <NoQuieroCrearMasNavbars />
            <div className="TitleRubricas">
                <h1>Editar Rubricas </h1>
            </div>
            <div className="OpcionesRubricas">
                <div className="NombreRubricas">
                    <h1>Rubrica predeterminada</h1>
                </div>
                <div className="OpcionRubricas">
                    <LargeButton icon={<Edit />} text="Crear Rubrica" />
                </div>
            </div>
        </div>
    )
}

export default Rubricas;