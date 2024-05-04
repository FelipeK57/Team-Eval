import Login2 from "../../components/Login2";

function CambiarContraseña() {
    return (
        <Login2 Title="Cambiar Contraseña"
                Type1="password" 
                Field1="Nueva Contraseña"
                Type2="password"
                Field2="Confirmar Contraseña"
                ForgotPassword={false}
                Button="Hecho"
        />
    )
}

export default CambiarContraseña;