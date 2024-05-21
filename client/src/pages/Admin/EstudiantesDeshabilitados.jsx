import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EstudiantesDeshabilitados.css";
import axios from "axios";
import ListEstDes from "../../components/EstudiantesDes/ListEstDes";  // Asegúrate de que la ruta sea correcta

function EstudiantesDeshabilitados() {
    return (
        <div className="ContainerEstDes">
          <div className="NavBar">
            <NoQuieroCrearMasNavbars />
          </div>
          <div className="TitleEstDes">
            <h1>Estudiantes Deshabilitados</h1>
          </div>
          <div className="ListaEstDes">
              <div>
                <ListEstDes
                  Nombre1="Luis Falcao"
                  Apellido1="Diaz Rubio"
                  Codigo1="234567"
                  onClickRestored="xd"
                  Buttons={true}
                />
              </div>
          </div>
        </div>
      );
}

export default EstudiantesDeshabilitados;

