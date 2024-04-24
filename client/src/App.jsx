import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import EstudianteHome from "./components/EstudianteHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/StudentHome" element={<EstudianteHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
