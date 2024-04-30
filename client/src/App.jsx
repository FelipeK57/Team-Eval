import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import PrivateP from "./components/PrivateP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home />} />
        <Route path="/ProfesorHome" element={<PrivateP/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
