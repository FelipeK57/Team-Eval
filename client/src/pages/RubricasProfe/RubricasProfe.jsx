import NavbarProfesor from "../../components/NavbarProfesor";
import LargeButton from "../../components/Utilities/LargeButton";
import AddIcon from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function RubricasProfe() {

    const navigate = useNavigate();
    const [rubrica, setRubrica] = useState([]);
    const [rubricapre, setRubricapre] = useState([]);
   

    useEffect(() => {
        const fetchRubrica = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8000/rubricasProfe/", {
                identificacion: Cookies.get("identificacion"),
              }
            );
            setRubrica(response.data.rubricas);
            setRubricapre(response.data.predeterminada);
          } catch (error) {
            console.error("Error al obtener la rubrica", error);
          }
        };
        fetchRubrica();
      }, []);

      const Rubrica = (rubricaId) => {
        navigate(`/TablaRubricasProfe/${rubricaId}`);
    }

    const NuevaRubrica = () => {
        navigate(`/NuevaRubrica`);    
    }

      return (
        <div className="RubricasContainer">
            <NavbarProfesor/>
            <div className="TitleRubricas">
                <h1>Editar Rubricas</h1>
            </div>
            <div className="OpcionesRubricas">
                <div className="NombreRubricas">
                    <h1>Rubrica predeterminada</h1>
                </div>
                <div className="OpcionRubricas">
                    <LargeButton icon={<Edit />} text={rubricapre.nombre} OnClick={() => Rubrica(rubricapre.id)} />
                    <LargeButton icon={<AddIcon/>} text="Agregar nueva rubrica" OnClick={() => NuevaRubrica()} />
                </div>  
            </div>
            <div className="NombreRubricas">
                            <h1>Personalizadas</h1>
                        </div>
            <div className="OpcionesRubricas">
                {rubrica.map(rubrica => (
                    <div key={rubrica.id} className="RubricaItem">
                        
                        <div className="OpcionRubricas">
                            <LargeButton icon={<Edit />} text={rubrica.nombre   } OnClick={() => Rubrica(rubrica.id)}  />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

export default RubricasProfe;