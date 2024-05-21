import axios from "axios";
import { useState } from "react";
import "./ImportarCursos.css";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";

function ImportarCursos() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/import_cursos/",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
            <button onClick={() => document.querySelector('.upload').click()}>
              <UploadFileIcon sx={{ fontSize: 50 }} />
            </button>
          </div>
          <label className="fileName" htmlFor="file">{file?.name}</label>

        </div>
        <div className="Recommendations">
          <h1>Recomendaciones</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ratione porro ut sapiente dicta earum eos culpa mollitia cumque quidem velit id facilis ea fugit quod unde debitis, reprehenderit neque.</p>
        </div>

        <div className="EnviarContainer">
          <button onClick={sendFile}>Enviar</button>
        </div>
      </div>
      <div className="ContainerImportarCursos2">
        <div className="Recommendations Recommendations2">
          <h1> imagenes de Recomendaciones</h1>
        </div>
      </div>
    </div>
  );
}
  
export default ImportarCursos;
