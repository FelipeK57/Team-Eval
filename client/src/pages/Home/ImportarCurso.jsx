import axios from "axios";
import { useState } from "react";
import "./ImportarCursos.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Cookies from "js-cookie";
import PopUp from "../../components/Utilities/PopUp";

function ImportarCursos() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendFile = async (e) => {
    e.preventDefault();

    if (!file) {
      setAdvice("No se ha seleccionado ningún archivo");
      popup(e);
      return;
    }

    const fileType = file.name.split(".").pop();

    if (fileType !== "xlsx") {
      setAdvice("El archivo debe ser tipo .xlsx");
      popup(e);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("codigo", Cookies.get("codigo"));

    try {
      const response = await axios.post(
        "http://localhost:8000/import_cursos/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAdvice(response.data.message);
      popup(e);
    } catch (error) {
      setAdvice(error.response.data.error);
      popup(e);
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
          <h1> Imagen de ejemplo</h1>
          <img
            alt="Imagen de ejemplo"
            src="../../../public/recomendacionImportCurso.png"
          />
        </div>
      </div>
      <PopUp
        open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="Volver"
        onClick1={popup}
      />
    </div>
  );
}

export default ImportarCursos;
