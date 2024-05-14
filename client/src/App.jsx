import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./pages/Home/Home";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import Curso from "./pages/CursosStudent/Curso";
import CursoP from "./pages/CursosProfe/CursoP";
<<<<<<< HEAD
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin.jsx";
import ActualizacionCorreo from "./pages/ActualizacionCorreo/ActualizacionCorreo.jsx";
import ActualizacionCorreoP from "./pages/ActualizacionCorreo/ActualizarCorreoProfesor.jsx";
import AvisoCorreo from "./pages/ActualizacionCorreo/AvisoCorreo.jsx";
import CambiarContraseña from "./pages/CambiarContraseña/CambiarContraseña.jsx";
import CodigoVerificacion from "./pages/CambiarContraseña/CodigoVerificacion.jsx";
import VerificacionCorreo from "./pages/CambiarContraseña/VerificacionCorreo.jsx";
import CursosEstudiante from "./pages/HomeStudent/CursosEstudiante.jsx";
import MiCuentaP from "./pages/MiCuenta/MiCuentaP.jsx";
import CambiarContraEstudiante from "./pages/CambiarContraseña/CambiarContraEstudiante.jsx";
import AgregarCurso from "./pages/Admin/AgregarCurso.jsx";
import AgregarProfesor from "./pages/Admin/AgregarProfesor.jsx";
import InformesEstudiantes from "./pages/Informes/InformesEstudiantes.jsx";
import AvisoContraseña from "./pages/CambiarContraseña/AvisoContraseña.jsx";

=======
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
>>>>>>> origin/Home2
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />

        <Route path="/ActualizacionCorreo" element={<ActualizacionCorreo />} />
        <Route path="/ActualizacionCorreoP" element={<ActualizacionCorreoP />}/>
        <Route path="/AvisoCorreo" element={<AvisoCorreo />} />

        <Route path="/VerificacionCorreo"element={<VerificacionCorreo NavigateRoute="Login" />}/>
        <Route path="/CodigoVerificacion" element={<CodigoVerificacion />} />
        <Route path="/CambiarContraseña" element={<CambiarContraseña />} />
        <Route path="/CambioContraEstudiante" element={<CambiarContraEstudiante />}/>
        <Route path="/AvisoContraseña" element={<AvisoContraseña/>} />

        <Route path="/" element={<Home />} />

        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/InformesEstudiante" element={<InformesEstudiantes />} />
        
        <Route path="/Profesor" element={<HomeProfesor />} />

        <Route path="/MiCuenta" element={<MiCuenta />} />
        <Route path="/MiCuentaP" element={<MiCuentaP />} />

        <Route path="/Cursos" element={<CursosEstudiante />} />
        <Route path="/Curso" element={<Curso />} />
        <Route path="/CursoP" element={<CursoP />} />
<<<<<<< HEAD
        
        <Route path="/AgregarCurso" element={<AgregarCurso />} />
        <Route path="/AgregarProfesor" element={<AgregarProfesor />} />
=======
        <Route path="/Admin" element={<HomeAdmin />} />
>>>>>>> origin/Home2
      </Routes>
    </BrowserRouter>
  );
}

export default App;
