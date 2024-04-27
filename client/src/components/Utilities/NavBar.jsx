
import './NavBar.css';
import "../../../public/Logo.png";
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <nav className="navbar" >
      <div className='imagen'><img src="../../public/Logo.png" alt="logo" /></div>
      <div>
        {props.Estudiante ? <Link className='navbaraE'>{props.Estudiante}</Link> : null }
        {props.informes ? <Link className='navbarain' to='#'>Informes</Link>:null}
        <Link to='/login' className='navbara'>{props.sesion}</Link>
      </div>
    </nav>
  );
};

export default NavBar;