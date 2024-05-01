
import './Utilities/NavBar.css';
import "../../public/Logo.png";
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import Login from './Login';
=======
>>>>>>> Home2

const NavBar = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
<<<<<<< HEAD
      <Link to='/login' className='navbara'>Inicio de sesion</Link>
=======
      <a href="#" className="navbara"><b>Iniciar Sesion</b></a>
>>>>>>> Home2
    </nav>
  );
};

export default NavBar;