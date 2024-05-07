import "./MiCuenta.css";
import NavbarStudent from '../../components/NavbarStudent';
import Button2 from "../../components/Utilities/Button2";
import Button from "../../components/Utilities/Button";
import "../../../public/219969.png";
import NavbarProfesor from "../../components/NavbarProfesor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

function MiCuenta() {
   
    const navigate = useNavigate(); 
    const [profesorInfo, setProfesorInfo] = useState(null);
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

    useEffect(() => {
        const obtenerInformacionProfesor = async () => {
            try {
                const response = await axios.post("http://localhost:8000/ProfileProfesor/", {
                    identificacion: Cookies.get('identificacion'),
                }, {
                    headers: {
                        'Authorization': `Token ${Cookies.get('token')}`,
                    }
                });
                setProfesorInfo(response.data);
            } catch (error) {
                console.error("Error al obtener la información del profesor:", error);
            }
        };

        obtenerInformacionProfesor();
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/logout/", null, {
                headers: {
                    'Authorization': `Token ${Cookies.get('token')}`,
                }
            });
            Cookies.remove('token');
            Cookies.remove('loggedIn');
            Cookies.remove('identificacion');
            console.log(response.data);
            navigate('/Login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error.response.error);
        }
    }

    const handleClick2 = async (e) => {
        e.preventDefault();
        navigate('/CambiarContraseña');
    }


    

    return (    
        <div className="MiCuenta">
            <NavbarProfesor />
            <div className="card">
            <div className='iman'><img src="../../../public/219969.png" alt="usu" /></div>
            <div className="card2"><h1>{profesorInfo ? profesorInfo.nombre : 'Cargando...'}</h1></div>
            <div className="card3"><h1>{profesorInfo ? profesorInfo.apellidos : 'Cargando...'}</h1></div>
            <div className="card4"><h1>{profesorInfo ? profesorInfo.email : 'Cargando...'}</h1></div>
            </div>
            <div className="coso"><h1>Editar</h1></div>
            <div className="coso2">
                <Button2 Boton2="Correo" color="rgb(15, 65, 118)" fontColor="white" width="200px"/>
            </div>
            <div className="coso3">
                <Button onClick={handleClick2} Boton="Contraseña" color="rgb(15, 65, 118)" fontColor="white" width="200px"/>
            </div>
            <div className="coso4">
                <Button onClick={handleClick} Boton="Cerrar Sesión" color="Brown" fontColor="white" width="200px"/>
            </div>
        </div>
    );
}

export default MiCuenta;