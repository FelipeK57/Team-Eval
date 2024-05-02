import Login2 from "../../components/Login2";

function ActualizacionCorreo() {
    return (
        <Login2 Title="Actualizar correo"
                Type1="mail" 
                Field1="Nuevo Correo"
                Type2="mail"
                Field2="Confirmar Correo"
                ForgotPassword={false}
                Button="Hecho"
                NavigateRoute=""/>
    )
}

export default ActualizacionCorreo;