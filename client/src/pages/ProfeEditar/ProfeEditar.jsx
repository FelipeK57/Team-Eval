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
  const [success, setSuccess] = useState(false); // Estado para rastrear si el profesor se editó con éxito
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

  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
  }

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  }

  const popup = () => {
    setOpen(true);
  };

  const closePopupAndNavigate = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/CursosAdmin");
  };

  const closePopup = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setSuccess(false); // Restablecer el estado de éxito a falso al hacer clic

    // Validar que los campos no estén vacíos
    if (nombre === "" || apellido === "" || documento === "" || correo === "") {
      setAdvice("Por favor, rellene todos los campos.");
      popup();
      return;
    }

    // Validar que ni el nombre ni el apellido contengan números
    if (/^\d+$/.test(nombre) || /^\d+$/.test(apellido)) {
      setAdvice("El nombre o apellido no pueden contener números.");
      popup();
      return;
    }

    // Validar el formato del correo electrónico
    if (!/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(correo)) {
      setAdvice("Formato de correo electrónico incorrecto.");
      popup();
      return;
    }

    // Validar que el documento tenga al menos 8 dígitos
    if (documento.length < 8) {
      setAdvice("El documento debe tener al menos 8 dígitos.");
      popup();
      return;
    }

    // Validar que el documento no contenga caracteres especiales
    if (/[^a-zA-Z0-9]/.test(documento)) {
      setAdvice("El documento no puede tener caracteres especiales.");
      popup();
      return;
    }

    // Validar que el documento no contenga letras
    if (/[a-zA-Z]/.test(documento)) {
      setAdvice("El documento no puede tener letras.");
      popup();
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/edit_profesor/", {
        identificacion: Cookies.get("profesorIdentificacion"),
        nombre: nombre,
        newidentificacion: documento,
        email: correo
      });
      setSuccess(true); // Establecer éxito en verdadero si la solicitud es exitosa
      setAdvice("Profesor editado con éxito");
      setOpen(true);
      Cookies.remove("profesorIdentificacion");
      Cookies.remove("profesorNombre");
      Cookies.remove("profesorEmail");
    } catch (error) {
      setAdvice(error.response.data.error);
      popup();
    }
  }


  ProfeEditar.propTypes = {
    profesor: PropTypes.string.isRequired
  }

  const handlePopupClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (success) {
      navigate("/ProfesoresAdmin");
    }
  };

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
      <PopUp
        open={open}
        SetOpen={setOpen}
        Advice={advice}
        Width={"100%"}
        Button1="Volver"
        onClick1={handlePopupClick}
      />
    </div>
  )
}

export default ProfeEditar;
