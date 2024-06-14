import './Utilities/DropDown.css';
import { PropTypes } from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const DropDown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rubricas, setRubricas] = useState([]);
    const [predeterminada, setPredeterminada] = useState(null);

    useEffect(() => {
        const fetchestudiantes= async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/rubricasProfe/", 
                    { identificacion : Cookies.get("identificacion") }    
                );
                setRubricas(response.data.rubricas);
                setPredeterminada(response.data.predeterminada);
            } catch (error) {
                console.error("Error al obtener las rubricas  ", error);
            }
        };
        fetchestudiantes();
    }, []);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleRubricaClick = (rubrica) => {
        props.onSelectRubrica(rubrica.id, rubrica.nombre);
        setIsOpen(false);
    };

    DropDown.propTypes = {
        evaSeleccionada: PropTypes.string.isRequired,
        onSelectRubrica: PropTypes.func.isRequired
    }

    return (
        <div className="dropdown">
            <button onClick={toggleDropDown} className="dropdown-button">
                {props.evaSeleccionada ? props.evaSeleccionada : 'Seleccionar rúbrica de evaluación'}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </button>

            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                {predeterminada && (
                    <a href="#" onClick={() => handleRubricaClick(predeterminada)}>{predeterminada.nombre}</a>
                )}
                {rubricas.map((rubrica) => (
                    <a key={rubrica.id} href="#" onClick={() => handleRubricaClick(rubrica)}>{rubrica.nombre}</a>
                ))}
            </div>
        </div>
    );
};

export default DropDown;
