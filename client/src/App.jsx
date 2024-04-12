import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CursosPage } from "./pages/CursosPage";
import { CursosForm } from "./pages/CursosForm";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/cursos-create" element={<CursosForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
