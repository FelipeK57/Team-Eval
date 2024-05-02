import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";

import EstudianteHome from "./components/EstudianteHome";
import ProfesorHome from "./components/Professor";

import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import LoginAdmin from "./components/LoginAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/Profesor" element={<HomeProfesor />} />
        <Route path="/MiCuenta" element={<MiCuenta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
