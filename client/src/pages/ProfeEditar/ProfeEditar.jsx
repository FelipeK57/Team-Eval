import "./ProfeEditar.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";
import CardForm from "../../components/CardForm";

function ProfeEditar(props) {

  const [nombre, setNombre] = useState(Cookies.get("profesorNombre"));
  const [apellido, setApellidos] = useState(Cookies.get("profesorApellido"));
  const [documento, setDocumento] = useState(Cookies.get("profesorIdentificacion"));
  const [correo, setCorreo] = useState(Cookies.get("profesorEmail"));
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = () => {
      const user = Cookies.get("user");
      const token = Cookies.get("sessionid");

      if (user && token) {
        console.log("El usuario ha iniciado sesión.");
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/login");
      }
    };

    verificarSesion();
  }, [navigate]);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  }

  const handleApellidosChange = (e) => {
    setApellidos(e.target.value);
  }

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
  }

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/edit_profesor/", {
        identificacion: Cookies.get("profesorIdentificacion"),
        nombre: nombre,
        apellido: apellido,
        newidentificacion: documento,
        email: correo
      });
      setAdvice("Profesor editado con exito");
      popup(e);
      Cookies.remove("profesorIdentificacion");
      Cookies.remove("profesorNombre");
      Cookies.remove("profesorEmail");
      Cookies.remove("profesorApellido")
    } catch (error) {
      setAdvice(error.response.data.error);
      popup(e);
      const handleClick = async (e) => {
        e.preventDefault();
        if (!nombre || !documento || !correo) {
          setAdvice("Todos los campos son obligatorios");
          popup(e);
          return;
        }
        if (documento< 10000000 || documento > 99999999) {
          setAdvice("El documento debe ser de minimo 8 digitos");
          popup(e);
          return;
        }
        try {
          const response = await axios.post("http://localhost:8000/edit_profesor/", {
            identificacion: Cookies.get("profesorIdentificacion"),
            nombre: nombre,
            newidentificacion: documento,
            email: correo
          });
          setAdvice("Profesor editado con exito");
          popup(e);
          Cookies.remove("profesorIdentificacion"); 
          Cookies.remove("profesorNombre"); 
          Cookies.remove("profesorEmail");  
        } catch (error) {
          setAdvice(error.response.data.error);
          popup(e);
      }
    }
  }



  ProfeEditar.propTypes = {
    profesor: PropTypes.string.isRequired
  }

  return (
    <div className="Contenedor">
      <NoQuieroCrearMasNavbars />
      <CardForm Title={Cookies.get("profesorNombre")}
        Label1="Nombres"
        Type1="text"
        valueField1={nombre}
        onChangeField1={handleNombreChange}
        Field1=""
        Label2="Apellidos"
        type2="text"
        valueField2={apellido}
        onChangeField2={handleApellidosChange}
        Field2=""
        Label3="Documento"
        type3="text"
        valueField3={documento}
        onChangeField3={handleDocumentoChange}
        Field3=""
        Label4="Correo"
        type4="email"
        valueField4={correo}
        onChangeField4={handleEmailChange}
        Field4=""
        onClick={handleClick}
      />
      <PopUp open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="volver"
        onClick1={popup}

      />
    </div>
  )
}
}
export default ProfeEditar;