import Login2 from "../../components/Login2";
function LoginAdmin() {
    return(
        <Login2 Title="Administrador"
                Type1="number" 
                Field1="Codigo"
                Type2="password"
                Field2="Contraseña"
                ForgotPassword={true}
                Button="Iniciar Sesion"
                NavigateRoute="Login"/>
    );
}

export default LoginAdmin