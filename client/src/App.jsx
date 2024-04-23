import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CursosPage } from "./pages/CursosPage";
import { CursosForm } from "./pages/CursosForm";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/cursos-create" element={<CursosForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
