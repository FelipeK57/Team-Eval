import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import Login2 from "../../components/Login2";

function CambiarContraseña() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        const verificarSesion = () => {
            const loggedIn = Cookies.get('loggedIn');
            const userId = Cookies.get('identificacion');

            if (loggedIn === 'true' && userId) {
                console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
            } else {
                console.log("El usuario no ha iniciado sesión.");
                navigate('/Login');
            }
        };

        verificarSesion();
    }, [navigate]);

    
    const handlenewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleconfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
           
            return  alert("Las contraseñas no coinciden");
        }

        try {
            const response = await axios.post("http://localhost:8000/change/", {
                identificacion: Cookies.get('identificacion'),
                nueva_contraseña: newPassword,
            }
        
        );
            
            alert(response.data);
            
            
    } catch (error) {
        console.error("Error al realizar la solicitud:" + error);
    }

    try{

        const response2 = await axios.post("http://localhost:8000/logout/", null, {
                headers: {
                    'Authorization': `Token ${Cookies.get('token')}`,
                }
    });

    alert(response2.data);
    navigate("/Login");
    Cookies.remove('token');
    Cookies.remove('loggedIn');
    Cookies.remove('identificacion');
}catch(error){  
    console.error("Error al realizar la solicitud:" + error.response2.data.error);
}
}

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
      NavigateRoute="MiCuentaP"
    />
)

    }

export default CambiarContraseña;
