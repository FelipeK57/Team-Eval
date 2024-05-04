import { useState } from "react";
import Login2 from "../../components/Login2";

function ActualizacionCorreo() {
  const [newEmail, setNewEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");

  const handleNewChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleConfChange = (e) => {
    setConfEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/changeEmail/", {
        codigo: codigo,
        password: password,
      });
      console.log(newEmail + " " + confEmail);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <Login2
      Title="Actualizar correo"
      Type1="mail"
      Field1="Nuevo Correo"
      onChangeField1={handleNewChange}
      onChangeField2={handleConfChange}
      valueField1={newEmail}
      valueField2={confEmail}
      onClick={handleClick}
      Type2="mail"
      Field2="Confirmar Correo"
      ForgotPassword={false}
      Button="Hecho"
      NavigateRoute="/login"
    />
  );
}

export default ActualizacionCorreo;
