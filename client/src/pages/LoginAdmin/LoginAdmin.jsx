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
    const [advice, setAdvice] = useState("");

   

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCodigoChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleClick = async (e, setAdvice, popup) => {
       
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
            Cookies.set("user", response.data.user.user.username, { expires: 1 });
            Cookies.set("loggedIn", "true", { expires: 1 }); // Indica que el usuario ha iniciado sesión
            Cookies.set("codigo", response.data.user.codigo, { expires: 1 });
            Cookies.set("sessionid", response.data.sessionid, { expires: 1 });
            navigate('/Admin')
        }catch(error){
            setAdvice("Credenciales incorrectas");
            popup(e);
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
                NavigateRoute="Login"
                setAdvice={setAdvice}
                advice={advice} />     
                
    );
    
}

export default LoginAdmin