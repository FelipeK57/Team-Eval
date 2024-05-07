import "./MiCuenta.css";
import NavbarStudent from '../../components/NavbarStudent';
import Button2 from "../../components/Utilities/Button2";
import "../../../public/219969.png";

function MiCuenta() {

    return (    
        <div className="MiCuenta">
            <NavbarStudent />
            <div className="card">
            <div className='iman'><img src="../../../public/219969.png" alt="usu" /></div>
            <div className="card2"><h1>Ejemplo Nombres</h1></div>
            <div className="card3"><h1>Ejemplo Apellidos</h1></div>
            <div className="card4"><h1>correoelectronico@gmail.com</h1></div>
            </div>
            <div className="coso"><h1>Editar</h1></div>
            <div className="coso2">
                <Button2 Boton2="Correo" color="rgb(15, 65, 118)" fontColor="white" width="200px"/>
            </div>
            <div className="coso3">
                <Button2 Boton2="Contraseña" color="rgb(15, 65, 118)" fontColor="white" width="200px"/>
            </div>
            <div className="coso4">
                <Button2 Boton2="Cerrar Sesión" color="Brown" fontColor="white" width="200px"/>
            </div>
        </div>
    );
}

export default MiCuenta;