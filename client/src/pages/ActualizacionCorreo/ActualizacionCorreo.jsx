import { useState, useEffect } from "react";
import Login2 from "../../components/Login2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ActualizacionCorreo() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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

  const handleClick = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!email.includes("@") && !newEmail.includes("@")) {
      return alert("Ingrese un correo electronico valido");
    }

    if (email !== newEmail) {
      return alert("Los correo no son iguales");
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/change_email/",
        {
          codigo: Cookies.get("codigo"),
          email: email,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Cookies.set("email", email);
      navigate("/MiCuenta");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al hacer la solicitud al servidor");
    }
  };

  return (
    <Login2
      Title="Actualizar correo"
      Type1="mail"
      Field1="Nuevo Correo"
      onChangeField1={handleNewEmailChange}
      onChangeField2={handleEmailChange}
      valueField1={newEmail}
      valueField2={email}
      onClick={handleClick}
      Type2="mail"
      Field2="Confirmar Correo"
      ForgotPassword={false}
      Button="Hecho"
      NavigateRoute="MiCuenta"
    />
  );
}

export default ActualizacionCorreo;
