import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function EstudianteHome(){
    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = () => {
            const loggedIn = Cookies.get('loggedIn');
            const userId = Cookies.get('codigo');

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
            <h1>Hola Estudiante</h1>
        </div>
    );
}

export default EstudianteHome;