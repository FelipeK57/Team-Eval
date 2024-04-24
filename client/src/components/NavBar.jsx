
import './Utilities/NavBar.css';
import "../../public/Logo.png";
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'
import Login from './Login';
>>>>>>> origin/implementacion-auth

const NavBar = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
<<<<<<< HEAD
      <a href="#" className="navbara"><b>Iniciar Sesion</b></a>
=======
      <Link to='/login' className='navbara'>Inicio de sesion</Link>
>>>>>>> origin/implementacion-auth
    </nav>
  );
};

export default NavBar;