import Login2 from "../../components/Login2";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
function LoginAdmin() {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [codigo, setCodigo] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCodigoChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleClick = async (e) => {
       
        if (password.trim() === "") {
            return;
        }
        if (codigo.trim() === "") {
            return;
        }
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8000/login_admin/", {
                codigo: codigo,
                password: password,
            });
            Cookies.set("token", response.data.token, { expires: 1 }); // Guarda el token en una cookie que expira en 7 días
            Cookies.set("codigo", response.data.user.codigo);
            Cookies.set("loggedIn", "true", { expires: 1 }); // Indica que el usuario ha iniciado sesión
            navigate('/Admin')
        }catch(error){
            console.error("Error al realizar la solicitud:", error);
        return alert("No se encontro usuario con estas credenciales");
        }

    }




    return(
        <Login2 Title="Administrador"
                Type1="number" 
                Field1="Codigo"
                onChangeField1={handleCodigoChange}
                Type2="password"
                Field2="password"
                onChangeField2={handlePasswordChange}
                ForgotPassword={true}
                Button="Iniciar Sesion"
                onClick={handleClick}
                NavigateRoute="Login"/>
    );
}

export default LoginAdmin