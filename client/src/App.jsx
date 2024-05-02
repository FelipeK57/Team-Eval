import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";

import EstudianteHome from "./components/EstudianteHome";
import ProfesorHome from "./components/Professor";

import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin.jsx";
import ActualizacionCorreo from "./pages/ActualizacionCorreo/ActualizacionCorreo.jsx";
import AvisoCorreo from "./pages/ActualizacionCorreo/AvisoCorreo.jsx";
import AvisoContrasena from "./pages/CambiarContraseña/AvisoContraseña.jsx";
import CambiarContrasena from "./pages/CambiarContraseña/CambiarContraseña.jsx";
import CodigoVerificacion from "./pages/CambiarContraseña/CodigoVerificacion.jsx";
import VerificacionCorreo from "./pages/CambiarContraseña/VerificacionCorreo.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin/>} />
        <Route path="/ActualizacionCorreo" element={<ActualizacionCorreo />} />
        <Route path="/AvisoCorreo" element={<AvisoCorreo />} />
        <Route path="/VerificacionCorreo" element={<VerificacionCorreo NavigateRoute="Login"/>} />
        <Route path="/CodigoVerificacion" element={<CodigoVerificacion/>} />
        <Route path="/CambiarContraseña" element={<CambiarContrasena />} />
        <Route path="/AvisoContraseña" element={<AvisoContrasena />} />
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/Profesor" element={<HomeProfesor />} />
        <Route path="/MiCuenta" element={<MiCuenta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
