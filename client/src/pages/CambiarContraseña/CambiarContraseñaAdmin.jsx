import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Login2 from "../../components/Login2";

function CambiarContraseñaAdmin() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [advice, setAdvice] = useState("");
  useEffect(() => {
    const verificarSesion = () => {
      const userId = Cookies.get("codigo");
      const token = Cookies.get("token");

      if ( userId || token) {
        console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
      } else {
        console.log("El usuario no ha iniciado sesión.");
        navigate("/login");
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

  const handleClick = async (e, setAdvice, popup) => {
    if (newPassword !== confirmPassword) {
      setAdvice("las contrasenias no coinciden, por favor verifique");
      popup(e);
      return;
    }

    if (newPassword.trim() === "") {
      return;
    }

    if (confirmPassword.trim() === "") {
      return;
    }

    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/changeA/", {
        user : Cookies.get("user"),
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
      Cookies.remove("user");
      Cookies.remove("nombre");
    } catch (error) {
      console.error("Error al realizar la solicitud:" + error);
    }
  };

  return (
    <Login2
      Title="cambiar contraseña"
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
      NavigateRoute="MiCuentaA"
      setAdvice={setAdvice}
      advice={advice} 
    />
  );
}

export default CambiarContraseñaAdmin;
