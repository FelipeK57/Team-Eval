import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ProfesorHome(){
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const checkAuth = async () => {
        const response = await axios.get('http://localhost:8000/permisos/');
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          history("/login");
        }
      };
      checkAuth();
    }, []);
  
    if (!isLoggedIn) {
      return <div>Redirecting to login...</div>;
    }
  
    // Contenido de la página principal
    return (
      <div>
        <h1>Página principal</h1>
        {/* ... */}
      </div>
    );
}

export default ProfesorHome;