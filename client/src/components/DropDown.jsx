import React, { useState } from 'react';
import './Utilities/DropDown.css';
import { PropTypes } from "prop-types";

const DropDown = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    DropDown.propTypes = {
        evaSeleccionada: PropTypes.string.isRequired
    }

    return (
        <div className="dropdown">
            <button onClick={toggleDropDown} className="dropdown-button">
                {props.evaSeleccionada ? props.evaSeleccionada : 'Seleccionar rubrica de evaluación'}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </button>

                 <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    <a href="#">Oka loka</a>
                    <a href="#">Champeta</a>
                    <a href="#">Bombo</a>
                </div>

        </div>
    );
};

export default DropDown;