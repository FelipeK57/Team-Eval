
import './Utilities/NavBar.css';
import "../../public/Logo.png";
import { Link } from 'react-router-dom'
import Login from './Login';

const NavBar = () => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
      <Link to='/login' className='navbara'>Inicio de sesion</Link>
    </nav>
  );
};

export default NavBar;