import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import "./EditarRubricas.css"

function EditarRubricas() {

    return (
    <div className="Container">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="Title">
        <h1>Editar Rubricas</h1>
      </div>
      <div className="subTitle">
        <h1>Rubrica Predeterminada</h1>
      </div>
    </div>
    );
}

export default EditarRubricas;