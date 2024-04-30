import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/Profesor" element={<HomeProfesor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
