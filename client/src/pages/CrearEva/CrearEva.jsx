import "./CrearEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import DropDown from "../../components/DropDown";
import Button2 from "../../components/Utilities/Button2";

function CrearEva() {
    return (
        <div className="CrearEva">
            <NavbarProfesor />
            <div className="titu1">
                <h1>Nombre de la evaluación</h1>
            </div>
            <div className="label89">
            <input type="text" className="campo" required />
            </div>
            <div className="titu2">
                <h1>Elija la rubrica de evaluación</h1>
            </div>
            <div className="dropi">
            <DropDown />
            </div>
            <div className="titu3">
                <h1>Antes de crear la evaluación, asegurese <br /> de que los grupos sean correctos</h1>
            </div>
            <div className="bethesda">
                <Button2 Boton2="Gestionar grupos" color="WhiteSmoke" fontColor="black" width="250px" />
            </div>
            <div className="ubi">
                <Button2 Boton2="Crear Evaluación" color="rgb(15, 65, 118)" fontColor="white" width="200px" />
            </div>
        </div>
    );
}

export default CrearEva;