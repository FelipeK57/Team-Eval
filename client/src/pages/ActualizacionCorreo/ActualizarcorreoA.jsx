import { useState, useEffect } from "react";
import Login2 from "../../components/Login2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ActualizarcorreoA() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [advice, setAdvice] = useState("");

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {

    const verificarSesion = () => {
        const loggedIn = Cookies.get('loggedIn');
        const userId = Cookies.get('sessionid');

        if (loggedIn === 'true' && userId) {
            console.log("El usuario ha iniciado sesión.");
        } else {
            console.log("El usuario no ha iniciado sesión.");
            navigate('/Login');
        }
    };

    verificarSesion();
}, [navigate]);


  const handleClick = async (e, setAdvice, popup) => {
   
      let token = Cookies.get("sessionid");

      if (!email.includes("@") && !newEmail.includes("@")) {
        setAdvice("Ingresa un correo valido");
        popup(e);
        return;
      }
  
      if (email !== newEmail) {
        setAdvice("Los correos no son iguales");
        popup(e);
        return;
      }
  
      if (newEmail.trim() === "") {
        return;
      }
  
      if (email.trim() === "") {
        return;
      }
  
      e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/change_emailA/",
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
      navigate("/MiCuentaA");
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
      NavigateRoute="MiCuentaA"
      setAdvice={setAdvice}
      advice={advice} 
    />
  );
}

export default ActualizarcorreoA;
