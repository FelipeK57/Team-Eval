import NavbarProfesor from '../../components/NavbarProfesor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Field from '../../components/Utilities/Field';
import Button from '../../components/Utilities/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PopUp from '../../components/Utilities/PopUp';


function TablaRubricasProfe(props) {
    const { rubricaId } = useParams();
    const [rubrica, setRubrica] = useState({});
    const [criterios, setCriterios] = useState([]);
    const [criteriosEliminados, setCriteriosEliminados] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);

    };

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

    const agregarCriterio = () => {
        setCriterios([...criterios, { id: Date.now(), descripcion: "", valor: "" }]);
    };

    const eliminarCriterio = (id) => {
        const criterioEliminado = criterios.find(criterio => criterio.id === id);
        if (criterioEliminado) {
            setCriteriosEliminados([...criteriosEliminados, criterioEliminado]);
        }
        setCriterios(criterios.filter(criterio => criterio.id !== id));
    };

    const handleCriterioChange = (id, field, value) => {
        setCriterios(criterios.map(criterio =>
            criterio.id === id ? { ...criterio, [field]: value } : criterio
        ));
    };

    const guardarRubrica = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/guardarCriterios/", {
                id: rubricaId,
                criterios: criterios,
                criteriosEliminados: criteriosEliminados,
            }
            );
            setAdvice("Rubrica guardada");
            setOpen(!open);
        } catch (error) {
            setAdvice("Error al guardar la rubrica (Falta criterio o valor)");
            setOpen(!open);
        }
    };

    return (
        <div className="TablaRubricasContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="Rubricas">
                <div className="TitleTablaRubricas">
                    <h1>{rubrica.nombre}</h1>
                    <div className="EscalaTitleTablaRubricas">
                        <Field Tipo="Number" value={rubrica.escala} />
                    </div>
                </div>
                <div className="TablaRubricas">
                    <table className="RubricasTable"style={criterios.length === 0 ? { marginRight:"307px", marginLeft:"332px",width:"100%" } : null}> 
                        <thead>
                            <tr>
                                <th className="thuno"><div className="RubricasTableHeader uno"><h1>{rubrica.nombre}</h1></div></th>
                                <th className="thdos"><div className="RubricasTableHeader dos"><h1>Valor</h1></div></th>

                            </tr>
                        </thead>
                        <tbody>
                            {criterios.map(criterio => (
                                <tr key={criterio.id}>
                                    <td className="thleft">
                                        <div className="RubricasTableBody Left">
                                            <Field
                                                Tipo="text"
                                                value={criterio.descripcion}
                                                name="descripcion"
                                                onChange={(e) => handleCriterioChange(criterio.id, 'descripcion', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className="thright">
                                        <div className="RubricasTableBody Right">
                                            <Field
                                                Tipo="Number"
                                                value={criterio.valor}
                                                name="valor"
                                                onChange={(e) => handleCriterioChange(criterio.id, 'valor', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className="ThActions">
                                        <div className="DeleteButtonThActions">
                                            <button className="DeleteButton" onClick={() => eliminarCriterio(criterio.id)}>
                                                <DeleteIcon sx={{ fontSize: 35, color: "red" }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ButtonAgregarRubricas">
                    <button onClick={agregarCriterio}><AddIcon /></button>
                </div>
                <div className="ButtonGuardarRubricas">
                    <Button Boton="Guardar" color="rgb(15, 65, 118)" fontColor="white" onClick={guardarRubrica} />
                </div>
            </div>
            <div>
                <PopUp open={open}
                    SetOpen={setOpen}
                    Advice={advice}
                    Width={"100%"}
                    Button1="volver"
                    onClick1={popup}

                />
            </div>
        </div>

    );
}

export default TablaRubricasProfe;


