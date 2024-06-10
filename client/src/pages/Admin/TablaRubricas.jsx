import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Field from "../../components/Utilities/Field";
import "./TablaRubricas.css";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PopUp from '../../components/Utilities/PopUp';

function TablaRubricas(props) {
    const { rubricaId } = useParams();
    const [rubrica, setRubrica] = useState({});
    const [criterios, setCriterios] = useState([]);
    const [criteriosEliminados, setCriteriosEliminados] = useState([]);
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    const [escala, setEscala] = useState(0);

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);

    };

    const handleEscalaChange = (e) => {
        setEscala(e.target.value);
    };

    useEffect(() => {
        const fetchRubrica = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/obtenerCriterios/", {
                    id: rubricaId
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

    useEffect(() => {
        if (rubrica.escala !== undefined) {
            setEscala(rubrica.escala);
        }
    }, [rubrica]);

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
                "http://localhost:8000/TablaRubricas/", {
                id: rubricaId,
                criterios: criterios,
                criteriosEliminados: criteriosEliminados,
                newEscala : escala
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
                <NoQuieroCrearMasNavbars/>
            </div>
            <div className="Rubricas">
                <div className="TitleTablaRubricas">
                    <h1>{rubrica.nombre}</h1>
                    <div className="EscalaTitleTablaRubricas">
                    <Field
                            value={escala}
                            CampoColor="black"
                            Tipo="Number"
                            onChange={handleEscalaChange}
                        />
                    </div>
                </div>
                <div className="TablaRubricas">
                    <table className="RubricasTable">
                        <thead>
                            <tr>
                                <th className="thuno"><div className="RubricasTableHeader uno" style={{ borderRadius: criterios.length === 0 ? "25px 25px 25px 25px" : "25px 25px 0 0" }}><h1>{rubrica.nombre}</h1></div></th>

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
                                    <td className="ThActions" style={{ position: "absolute" }}>
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

export default TablaRubricas;