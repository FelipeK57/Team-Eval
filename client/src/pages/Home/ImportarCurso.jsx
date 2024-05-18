import axios from "axios";
import React, { useState } from "react";

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
    <div>
      <input onChange={handleFileChange} type="file" />
      <button onClick={sendFile}>Enviar</button>
    </div>
  );
}

export default ImportarCursos;