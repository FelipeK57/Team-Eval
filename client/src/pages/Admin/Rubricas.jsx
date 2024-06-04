import { Edit } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import LargeButton from "../../components/Utilities/LargeButton";
import "./Rubricas.css";
import { useNavigate } from "react-router-dom";

function Rubricas() {

    const navigate = useNavigate();

    const Rubrica = () => {
        navigate("/TablaRubricas");
    }

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
                    <LargeButton icon={<Edit />} text="Criterio numero 1" OnClick={Rubrica} />
                    <LargeButton icon={<AddIcon/>} text={false} OnClick={Rubrica} />
                </div>
            </div>
        </div>
    )
}

export default Rubricas;