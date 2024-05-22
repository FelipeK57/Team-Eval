import "./ProfeEditar.css";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import Button2 from "../../components/Utilities/Button2";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfeEditar(props) {

    const [nombre, setNombre] = useState("");   
    const [documento, setDocumento] = useState("");
    const [correo, setCorreo] = useState("");


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

      const handleClick = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/edit_profesor/", {
            identificacion: Cookies.get("profesorIdentificacion"),
            nombre: nombre,
            newidentificacion: documento,
            email: correo
          });
        } catch (error) {
          console.error("Error al realizar la solicitud:" + error);}
      }
    


    ProfeEditar.propTypes = {
        profesor: PropTypes.string.isRequired
    }

    return (
        <div className="ProfeEditar">
            <NoQuieroCrearMasNavbars />
            <form>
            <div className="panel">
            <div className="yamba"><h1>{props.profesor}</h1></div>
            <div className="yemba"><h1>Nombre:</h1></div>
            <input type="text" className="label" required 
            onChange={(e) => setNombre(e.target.value)}
            value ={nombre}/>
            <div className="yimba"><h1>Documento:</h1></div>
            <input type="number" className="label1" required 
            onChange={(e) => setDocumento(e.target.value)} />
            <div className="yomba"><h1>Correo:</h1></div>
            <input type="email" className="label2" required
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}/>
            </div>
            <div className="yumba">
                <Button2 Boton2="Guardar" color="rgb(15, 65, 118)" fontColor="white" width="250px"
                onClick={handleClick}/>
            </div>
            </form>
            </div>
    )
}

export default ProfeEditar;