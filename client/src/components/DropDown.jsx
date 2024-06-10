import React, { useState } from 'react';
import './Utilities/DropDown.css';

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropDown} className="dropdown-button">
                Predeterminado edición David
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