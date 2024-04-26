import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import HomeEstudiante from "./pages/Home/HomeEstudiante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginIniciado" element ={<HomeEstudiante/>} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
