import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import { CursosPage } from "./pages/CursosPage";
import { CursosForm } from "./pages/CursosForm";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home/Home";
=======
import Login from "./components/Login";
>>>>>>> 38b3ec141171869eebfb6a72367b2af5d606f92c

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/cursos" />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/cursos-create" element={<CursosForm />} />
        <Route path="/home" element={<Home />} />
=======
        <Route path="/login" element={<Login />} />
>>>>>>> 38b3ec141171869eebfb6a72367b2af5d606f92c
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
