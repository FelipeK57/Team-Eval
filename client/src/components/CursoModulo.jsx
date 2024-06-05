import React from "react";
import "../components/CursoModelo.css";
import { Link } from "react-router-dom";
import Button from "./Utilities/Button"; 

function CursoModelo(props) {
  const colorCurso = () => {
    if (props.state === false) {
      return "curso-terminado";
    } else {
      return "curso-en-curso";
    }
  };
  const estadoCurso = () => {
    if (props.state === false) {
      return <h1>Terminado</h1>;
    } else {
      return (
        <Button LineaBoton={false} Boton="ir" onClick={props.onClick} />
      );
    }
  };

  return (
    <div className={colorCurso()}>
      <h1>{props.name}</h1>
      <hr style={{ width: "100%" }}></hr>
      <div className="estadoButton">{estadoCurso()}</div>
    </div>
  );
}

export default CursoModelo;
