import "./ProfeEditar.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";

function ProfeEditar(props) {

    const [nombre, setNombre] = useState(Cookies.get("profesorNombre"));   
    const [documento, setDocumento] = useState(Cookies.get("profesorIdentificacion"));
    const [correo, setCorreo] = useState(Cookies.get("profesorEmail")); 
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = () => {
          const user = Cookies.get("user");
          const token = Cookies.get("token");
    
          if ( user &&  token) {
            console.log("El usuario ha iniciado sesión. username:", user);
          } else {
            console.log("El usuario no ha iniciado sesión.");
            navigate("/login");
          }
        };
    
        verificarSesion();
      }, [navigate]);

      const handleNombreChange = (e) => {
        setNombre(e.target.value);
      }

      const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
    };
    
      const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
      }
    
      const handleEmailChange = (e) => {
        setCorreo(e.target.value);
      }

      const handleClick = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/edit_profesor/", {
            identificacion: Cookies.get("profesorIdentificacion"),
            nombre: nombre,
            newidentificacion: documento,
            email: correo
          });
          setAdvice("Profesor editado con exito");
          popup(e);
          Cookies.remove("profesorIdentificacion"); 
          Cookies.remove("profesorNombre"); 
          Cookies.remove("profesorEmail");  
        } catch (error) {
          setAdvice(error.response.data.error);
          popup(e);
      }
    }
    


    ProfeEditar.propTypes = {
        profesor: PropTypes.string.isRequired
    }

    return (
        <div className="ProfeEditar">
            <NoQuieroCrearMasNavbars />
            <form className="form"  >
            <div className="panel">
            <div className="yamba"><h1>{Cookies.get("profesorNombre") }</h1></div>
            <div className="yemba"><h1>Nombre:</h1></div>
            <input type="text" className="label" required 
            onChange={handleNombreChange}
            value ={nombre}/>
            <div className="yimba"><h1>Documento:</h1></div>
            <input type="number" className="label1" required 
            onChange={handleDocumentoChange}
            value={documento} />
            <div className="yomba"><h1>Correo:</h1></div>
            <input type="email" className="label2" required
            onChange={handleEmailChange}
            value={correo}/>
            </div>
            <div className="yumba">
                <Button Boton="Guardar" color="rgb(15, 65, 118)" fontColor="white" width="300px"
                onClick={handleClick}/>
            </div>
            </form>
            <PopUp open={open}
                SetOpen={setOpen}
                Advice={advice} 
                Width={"100%"}
                Button1="volver"
               onClick1={popup}
                
            />
            </div>
    )
}

export default ProfeEditar;