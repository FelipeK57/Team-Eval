import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardForm from "../../components/componentsEditarCurso/CardFormEditarCurso";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";

function EditarCurso() {
  
  return (
    <div className="Contenedor">
      <NoQuieroCrearMasNavbars />
      <CardForm
        Title={"Editar Curso"}
        Label1="Nombre"
        Field1=""
        Label2="Codigo"
        type2="text"
        Field2=""
        Label3="Periodo"
        type3="text"
        Field3=""
      />
    </div>
  );
}

export default EditarCurso;

