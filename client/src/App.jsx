import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import Curso from "./pages/CursosStudent/Curso";
import CursoP from "./pages/CursosProfe/CursoP";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import ProfeEditar from "./pages/ProfeEditar/ProfeEditar";
import CursosDes from "./pages/CursosDes/CursosDes";
import ProfeDes from "./pages/ProfeDes/ProfeDes";
import Grupos from "./pages/Grupos/Grupos";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/Profesor" element={<HomeProfesor />} />
        <Route path="/MiCuenta" element={<MiCuenta />} />
        <Route path="/Curso" element={<Curso />} />
        <Route path="/CursoP" element={<CursoP />} />
        <Route path="/Admin" element={<HomeAdmin />} />
        <Route path="/ProfeEditar" element= {<ProfeEditar profesor="Pedro Vargas"/>}/>
        <Route path="/CursosDes" element={<CursosDes />} />
        <Route path="/ProfeDes" element={<ProfeDes />} />
        <Route path="/Grupos" element={<Grupos materia="Matematicas"/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
