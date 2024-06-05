import './Utilities/NavbarProfesor.css';
import "../../public/Logo.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavbarProfesor = () => {

  const navigate = useNavigate();
  const Home = () => {
    navigate('/Profesor');
  };
  const BackButton = () => {
    navigate(-1);
  };
  return (
    <nav className="navb" >
      <div className='mimin'>
        <ArrowBackIcon className='ArrowBackIconNavA' onClick={BackButton} sx={{
          color: "white",
          fontSize: "5rem",
          marginRight: "2rem",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginBottom:"10px",
          transition:"0.3s"
        }} />
        <img src="../../public/Logo.png" alt="logo" onClick={Home} style={{ cursor: "pointer" }} />
      </div>
      <h1 href="#" className="navbh1"><b>¡Profesor!</b></h1>
      <a href="MiCuentaP" className="navba"><b>Mi Cuenta</b></a>
      <Link to="/InformesProfe" className="navbb"><b>Informes</b></Link>
    </nav>
  );
};

export default NavbarProfesor;