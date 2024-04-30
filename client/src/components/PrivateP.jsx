import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function PrivateP(){
    const navigate = useNavigate();

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

    return (
        <div>
            <h1>Hola Profe</h1>
        </div>
    );
}

export default PrivateP;
