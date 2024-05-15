import Aviso from "../../components/Aviso";

function AvisoContraseña() {
    return (
        <Aviso Title="Aviso"
               Text="Su contraseña ha sido cambiada con exito, por favor inicie sesión nuevamente para completar el proceso." 
               Button="Iniciar sesion"
               NavigateRoute="Login" />
    );
}

export default AvisoContraseña