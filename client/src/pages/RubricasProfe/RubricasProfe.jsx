import NavbarProfesor from "../../components/NavbarProfesor";
import LargeButton from "../../components/Utilities/LargeButton";
import AddIcon from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function RubricasProfe() {

    const navigate = useNavigate();

    const Rubrica = () => {
        navigate("/TablaRubricasProfe");
    }

    return (
        <div className="RubricasContainer">
            <NavbarProfesor/>
            <div className="TitleRubricas">
                <h1>Editar Rubricas </h1>
            </div>
            <div className="OpcionesRubricas">
                <div className="NombreRubricas">
                    <h1>Rubrica predeterminada</h1>
                </div>
                <div className="OpcionRubricas">
                    <LargeButton icon={<Edit />} text="Respeto" OnClick={Rubrica} />
                    <LargeButton icon={<AddIcon/>} text={false} OnClick={Rubrica} />
                </div>
            </div>
        </div>
    )
}

export default RubricasProfe;