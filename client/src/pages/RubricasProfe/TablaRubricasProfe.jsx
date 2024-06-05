import NavbarProfesor from '../../components/NavbarProfesor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Field from '../../components/Utilities/Field';
import Button from '../../components/Utilities/Button';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

function TablaRubricasProfe (props) {
    const { rubricaId } = useParams();
    const [rubrica, setRubrica] = useState([]);
    const [criterios, setCriterios] = useState([]);

    useEffect(() => {
        const fetchRubrica = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8000/obtenerCriterios/", {
                id: rubricaId,
              }
            );
            setRubrica(response.data.rubrica);
            setCriterios(response.data.criterios);
          } catch (error) {
            console.error("Error al obtener la rubrica", error);
          }
        };
        fetchRubrica();
      }, [rubricaId]);
      return (
        <div className="TablaRubricasContainer">
            <div className="NavBar">
                <NavbarProfesor/>
            </div>
            <div className="Rubricas">
                <div className="TitleTablaRubricas">
                    <h1>{rubrica.nombre}</h1>
                </div>
                <div className="TablaRubricas">
                    <table className="RubricasTable">
                        <thead>
                            <tr>
                                <th className="thuno"><div className="RubricasTableHeader uno"><h1>{rubrica.nombre}</h1></div></th>
                                <th className="thdos"><div className="RubricasTableHeader dos"><h1>Valor</h1></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {criterios.map(criterio => (
                                <tr key={criterio.id}>
                                    <td className="thleft"><div className="RubricasTableBody Left">{criterio.descripcion}</div></td>
                                    <td className="thright"><div className="RubricasTableBody Right"><Field Tipo="Number" name="name"/></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="ButtonTablaRubricas">
                        <button className="DeleteButton"><DeleteIcon sx={{ fontSize: 35, color: "red" }} /></button>
                    </div>
                </div>
                <div className="ButtonAgregarRubricas">
                    <button><AddIcon/></button>
                </div>
                <div className="ButtonGuardarRubricas">
                    <Button Boton="Guardar" color="rgb(15, 65, 118)" fontColor="white"/>
                </div>
            </div>
        </div>
    );
}

export default TablaRubricasProfe;