import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EstudiantesDeshabilitados.css";
import axios from "axios";
import ListEstDes from "../../components/EstudiantesDes/ListEstDes";

function EstudiantesDeshabilitados() {
  const [estudiantesDeshabilitados, setEstudiantesDeshabilitados] = useState([]);

  useEffect(() => {
    const fetchEstudiantesDeshabilitados = async () => {
      try {
        const response = await axios.get("http://localhost:8000/estudiantes-deshabilitados/");
        setEstudiantesDeshabilitados(response.data.estudiantes_deshabilitados);
      } catch (error) {
        console.error("Error al obtener los estudiantes deshabilitados:", error);
      }
    };

    fetchEstudiantesDeshabilitados();
  }, []);

  return (
    <div className="ContainerEstDes">
      <div className="NavBar">
        <NoQuieroCrearMasNavbars />
      </div>
      <div className="TitleEstDes">
        <h1>Estudiantes Deshabilitados</h1>
      </div>
      <div className="ListaEstDes">
        {estudiantesDeshabilitados.map((estudiante, index) => (
          <div key={index}>
            <ListEstDes
              Nombre1={estudiante.user.first_name}
              Apellido1={estudiante.user.last_name}
              Codigo1={estudiante.codigo}
              onClickRestored="xd"
              Buttons={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstudiantesDeshabilitados;

