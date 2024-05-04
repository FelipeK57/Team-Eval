import Login2 from "../../components/Login2";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function CambiarContraseña() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("hecho");
    const[new_password, setPassword] = useState("");
    const[confirm_password, setConfirmPassword] = useState("");
    

    const handlenew_passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleconfirm_passwordChange = (e) => {
        setConfirmPassword(e.target.value); 
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const user = Cookies.get('user');
        try {
            const response = await axios.post("http://localhost:8000/change/", {
                user: user,
                new_password: new_password,
                confirm_password: confirm_password
            });
            console.log(response.data);
            navigate("/Login");
            
    }catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}



    return (
        <Login2 Title="Cambiar Contraseña"
                Type1="password" 
                Field1="Nueva Contraseña"
                Type2="password"
                Field2="Confirmar Contraseña"
                ForgotPassword={false}
                Button="Hecho"
        />
    )
}

export default CambiarContraseña;