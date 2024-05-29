import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import axios from "axios";

function ImportarEstudiantes() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    if (!file) {
      alert("No se ha seleccionado ningún archivo");
      return;
    }

    const fileType = file.name.split(".").pop();

    if (fileType !== "xlsx") {
      alert("El archivo debe ser de tipo .xlsx");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/import_estudiantes/",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert("ERROR DEL SERVIDOR");
    }
  };
  return (
    <div className="ImportarCursosContainer">
      <div className="ContainerImportarCursos">
        <div className="ImportarCursos">
          <NoQuieroCrearMasNavbars />
          <input className="upload" type="file" onChange={handleFileChange} />
          <div className="FileContainer">
            <h1 className="ButtonText">Subir Archivo</h1>
            <button onClick={() => document.querySelector(".upload").click()}>
              <UploadFileIcon sx={{ fontSize: 50 }} />
            </button>
          </div>
          <label className="fileName" htmlFor="file">
            {file?.name}
          </label>
        </div>
        <div className="Recommendations">
          <h1>Recomendaciones</h1>
          <h3>
            Seguir al pie de la letra las siguientes instrucciones para un
            correcto funcionamiento de el modulo de importar cursos
          </h3>
          <ul>
            <li>Enviar archivos con extension .xlsx</li>
            <li>No dejar campos vacios</li>
            <li>Agregar completamente las credenciales de los usuarios</li>
            <li>
              Dejar la palabra 'Fin' en la columna A y en la fila luego de los
              estudiantes
            </li>
            <li>
              El codigo representa tanto el codigo de cursos, como el codigo de
              estudiante como la identificacion de el profesor
            </li>
          </ul>
        </div>

        <div className="EnviarContainer">
          <button onClick={sendFile}>Enviar</button>
        </div>
      </div>
      <div className="ContainerImportarCursos2">
        <div className="Recommendations Recommendations2">
          <h1> Imagenes de Recomendaciones</h1>
        </div>
      </div>
    </div>
  );
}

export default ImportarEstudiantes;
