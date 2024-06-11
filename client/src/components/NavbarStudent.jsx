import "./Utilities/NavbarStudent.css";
import "../../public/Logo.png";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const NavbarStudent = () => {

  const navigate = useNavigate();

  const BackButton = () => {
    navigate(-1);
  };

  const Home = () => {
    navigate('/Student');
  };

  return (
    <nav className="navbar">
      <div className="mimin">
        <ArrowBackIcon className='ArrowBackIconNavA' onClick={BackButton} sx={{
          color: "white",
          fontSize: "5rem",
          marginRight: "2rem",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginBottom: "10px",
          transition: "0.3s"
        }} />
        <img src="../../public/Logo.png" alt="logo" onClick={Home} style={{ cursor: "pointer" }} />
      </div>
      <h1 href="#" className="navbarh1">
        <b>¡Estudiante!</b>
      </h1>
      <Link to="/MiCuenta" className="nava">
        <b>Mi Cuenta</b>
      </Link>
      <Link to="/InformesEstudiante" className="naveb">
        <b>Informes</b>
      </Link>
    </nav>
  );
};

export default NavbarStudent;
