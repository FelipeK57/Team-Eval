import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
<<<<<<< HEAD
import EstudianteHome from "./components/EstudianteHome";
import ProfesorHome from "./components/Professor";

=======
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
>>>>>>> Home2
function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home />} />
        <Route path="/StudentHome" element={<EstudianteHome />} />
        <Route path="/ProfesorHome" element={<ProfesorHome/>} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/Profesor" element={<HomeProfesor />} />
        <Route path="/MiCuenta" element={<MiCuenta />} />
>>>>>>> Home2
      </Routes>
    </BrowserRouter>
  );
}

export default App;
