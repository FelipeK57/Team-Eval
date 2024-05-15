import "./HomeAdmin.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';


function HomeAdmin() {
  const navigate = useNavigate();

  const importarCursos = () => {
    navigate("/ImportarCurso");
  };

  const cursos = () => {
    navigate("/CursosAdmin");
  }

  const Profesores = () => {
    navigate("/ProfesoresAdmin");
  }

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
      <div className="coronel">
        <button onClick={cursos}>
          <SettingsIcon sx={{ fontSize: 50 }} />
        </button>
      </div>
      <div className="coronel2">
        <button onClick={""}>
          <EditNoteIcon sx={{ fontSize: 50 }} />
        </button>
      </div>
      <div className="coron2">
        <h1>Rubricas</h1>
      </div>
      <div className="coronel3">
        <button onClick={Profesores}>
          <PersonIcon sx={{ fontSize: 50 }} />
        </button>
      </div>
      <div className="coron3">
        <h1>Profesores</h1>
      </div>
      <div className="coron4">
        <h1>Importar Cursos</h1>
      </div>
      <div className="coronel4">
        <button onClick={importarCursos}>
          <UploadFileIcon sx={{ fontSize: 50 }} />
        </button></div>
    </div>
  )
}

export default HomeAdmin;