import "./HomeAdmin.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button2 from "../../components/Utilities/Button2";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";


function HomeAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = () => {
          const loggedIn = Cookies.get("loggedIn");
          const userId = Cookies.get("codigo");
    
          if (loggedIn === "true" && userId) {
            console.log("El usuario ha iniciado sesión. ID de usuario:", userId);
          } else {
            console.log("El usuario no ha iniciado sesión.");
            navigate("/Login");
          }
        };
    
        verificarSesion();
      }, [navigate]);
  

    return (
        <div className="HomeAdmin">
            <NoQuieroCrearMasNavbars />
            <div className="coron"><h1>Cursos</h1></div>
            <div className="coronel"></div>
            <div className="coronel2"></div>
            <div className="coron2"><h1>Rubricas</h1></div>
            <div className="coronel3"></div>
            <div className="coron3"><h1>Profesores</h1></div>
            <div className="coronel4"></div>
            <div className="coron4"><h1>Importar Cursos</h1></div>
            </div>
    )
}

export default HomeAdmin;