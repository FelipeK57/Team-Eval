import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Login2 from "../../components/Login2";

function CambiarContraEstudiante() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const verificarSesion = () => {
      const loggedIn = Cookies.get("loggedIn");
      const userId = Cookies.get("codigo");

      if (loggedIn === "true" && userId) {
        console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/AvisoContraseña");
      }
    };

    verificarSesion();
  }, [navigate]);

  const handlenewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleconfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    if (newPassword === "") {
      return alert("Por favor, ingrese su nueva contraseña");
    }

    try {
      const response = await axios.post("http://localhost:8000/changeE/", {
        codigo: Cookies.get("codigo"),
        nueva_contraseña: newPassword,
      });
    } catch (error) {
      console.error("Error al realizar la solicitud:" + error);
    }

    try {
      const response2 = await axios.post(
        "http://localhost:8000/logout/",
        null,
        {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      navigate("/AvisoContraseña");
      Cookies.remove("token");
      Cookies.remove("loggedIn");
      Cookies.remove("codigo");
    } catch (error) {
      console.error("Error al realizar la solicitud:" + error);
    }
  };

  return (
    <Login2
      Title="Cambiar contraseña"
      Type1="password"
      Field1="Nueva contraseña"
      onChangeField1={handlenewPasswordChange}
      onChangeField2={handleconfirmPasswordChange}
      valueField1={newPassword}
      valueField2={confirmPassword}
      onClick={handleClick}
      Type2="password"
      Field2="confirmar nueva contraseña"
      ForgotPassword={false}
      Button="Hecho"
      NavigateRoute="MiCuenta"
    />
  );
}

export default CambiarContraEstudiante;
