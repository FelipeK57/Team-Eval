import React from "react";
import "../components/CursoModelo.css";
import { Link } from "react-router-dom";

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
        <Link className="link-evaluacion" to="/login">
          Ir
        </Link>
      );
    }
  };

  return (
    <div className={colorCurso()}>
      <h1>{props.name}</h1>
      <hr style={{ width: "100%" }}></hr>
      <div>{estadoCurso()}</div>
    </div>
  );
}

export default CursoModelo;
