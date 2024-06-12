import "./CrearEva.css";
import NavbarProfesor from "../../components/NavbarProfesor";
import DropDown from "../../components/DropDown";
import Button2 from "../../components/Utilities/Button2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/Utilities/PopUp";

function CrearEva() {
    const { cursoId } = useParams();
    const [nombre, setNombre] = useState("");
    const [rubrica, setRubrica] = useState("");
    const [numeroGrupos, setNumeroGrupos] = useState("");
    const [rubricaNombre, setRubricaNombre] = useState("");
    const [evaId, setEvaId] = useState("");
    const [open, setOpen] = useState(false);
    const [advice, setAdvice] = useState("");
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/crear_eva/", {
               nombre: nombre,
               rubricaId: rubrica,
               cursos: numeroGrupos,
               cursoId: cursoId
            }
            );
            setEvaId(response.data.evaluacionId);
            setAdvice(response.data.message);
            setOpen(true);
           
            
        } catch (error) {
            console.error("Error al crear la evaluación  ", error);
        }
    };

    const handleSelectRubrica = (id, nombre) => {
        setRubrica(id);
        setRubricaNombre(nombre);
    };

    const popup = (e) => {
        e.preventDefault();
        setOpen(!open);
        navigate(`/Grupos/${evaId}/${cursoId}`, { state: { materia: nombre } });
    };

    return (
        <div className="CrearEva">
            <NavbarProfesor />
            <div className="titu1">
                <h1>Nombre de la evaluación</h1>
            </div>
            <div className="label89">
                <input type="text" className="campo" required onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="titu2">
                <h1>Elija la rubrica de evaluación</h1>
            </div>
            <div className="dropi">
                <DropDown evaSeleccionada={rubricaNombre} onSelectRubrica={handleSelectRubrica} />
            </div>
            <div className="titu3">
                <h1>Cuantos grupos desea para la evaluacion</h1>
            </div>
            <div className="label89">
                <input type="number" className="campo" required onChange={(e) => setNumeroGrupos(e.target.value)} />
            </div>
            <div className="ubi">
                <Button2 Boton2="Crear Evaluación" color="rgb(15, 65, 118)" fontColor="white" width="200px" onClick={handleClick} />
            </div>
            <div>
                <PopUp open={open}
                    SetOpen={setOpen}
                    Advice={advice}
                    Width={"100%"}
                    Button1="Ir a grupos"   
                    onClick1={popup}
                />
            </div>
        </div>
    );
}

export default CrearEva;
