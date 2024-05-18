import './Utilities/NoQuieroCrearMasNavbars.css';
import "../../public/Logo.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const NoQuieroCrearMasNavbars = () => {

  const navigate = useNavigate();

    const Home = () => {
        navigate('/Admin');
    };

    const BackButton = () => {
        navigate(-1);
    };


  return (
    <nav className="no" >
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
      <h1 href="#" className="ayuda"><b>¡Administrador!</b></h1>
      <a href="/MicuentaA" className="noquiero"><b>Mi Cuenta</b></a>
    </nav>
  );
};

export default NoQuieroCrearMasNavbars;