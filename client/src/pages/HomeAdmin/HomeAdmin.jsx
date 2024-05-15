import "./HomeAdmin.css";
import React, { useState } from "react";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import axios from "axios";
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

function HomeAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = () => {
      const loggedIn = Cookies.get("loggedIn");
      const userId = Cookies.get("codigo");

      if (loggedIn === "true" && userId) {
        console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/Login");
      }
    };

    verificarSesion();
  }, [navigate]);

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
    <div className="HomeAdmin">
      <NoQuieroCrearMasNavbars />
      <div className="coron">
        <h1>Cursos</h1>
      </div>
      <div className="coronel"></div>
      <div className="coronel2"></div>
      <div className="coron2">
        <h1>Rubricas</h1>
      </div>
      <div className="coronel3"></div>
      <div className="coron3">
        <h1>Profesores</h1>
      </div>
      <div className="coronel4">
        <label for="fileInput" class="customFileUpload">
          <span class="material-icons">file_upload</span>
          <input
            id="fileInput"
            class="inputFile"
            onChange={handleFileChange}
            type="file"
          />
        </label>
        <button class="submitButton" onClick={sendFile}>
          Enviar
        </button>
      </div>
      <div className="coron4">
        <h1>Importar Cursos</h1>
      </div>
    </div>
  );
}

export default HomeAdmin;
