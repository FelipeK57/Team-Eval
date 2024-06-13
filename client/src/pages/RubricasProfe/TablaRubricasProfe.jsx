import NavbarProfesor from "../../components/NavbarProfesor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Field from "../../components/Utilities/Field";
import Button from "../../components/Utilities/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PopUp from "../../components/Utilities/PopUp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../Admin/TablaRubricas.css";

function TablaRubricasProfe(props) {
  const { rubricaId } = useParams();
  const [rubrica, setRubrica] = useState({});
  const [criterios, setCriterios] = useState([]);
  const [criteriosEliminados, setCriteriosEliminados] = useState([]);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [escala, setEscala] = useState(0);
  const [iniciada, setIniciada] = useState(false);

  const handleEscalaChange = (e) =>{
    setEscala(e.target.value)
  }

  const navigate = useNavigate();

  const volver = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchRubrica = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/obtenerCriterios/",
          {
            id: rubricaId,
          }
        );
        setRubrica(response.data.rubrica);
        setCriterios(response.data.criterios);
        setIniciada(response.data.iniciada);
      } catch (error) {
        console.error("Error al obtener la rubrica", error);
      }
    };
    fetchRubrica();
  }, [rubricaId]);

  useEffect(() => {
    if (rubrica.escala !== undefined) {
      setEscala(rubrica.escala);
    }
  }, [rubrica]);

  const agregarCriterio = () => {
    setCriterios([
      ...criterios,
      { id: Date.now(), descripcion: "", valor: "" },
    ]);
  };

  const guardarRubrica = async () => {
    if (criterios.length === 0) {
      setAdvice("Falta agregar minimo un criterio");
      setOpen(!open);
      return;
    }
    if (escala === 0) {
      setAdvice("Falta agregar escala");
      setOpen(!open);
      return;
    }
    if (escala < 0) {
      setAdvice("La escala no puede ser negativa");
      setOpen(!open);
      return;
    }
    if (escala > 10) {
      setAdvice("La escala no puede ser mayor a 10");
      setOpen(!open);
      return;
    }
    for (let criterio of criterios) {
      if (criterio.descripcion.trim() === "") {
        setAdvice("Falta agregar descripción a los criterios");
        setOpen(!open);
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/guardarCriterios/",
        {
          id: rubricaId,
          criterios: criterios,
          criteriosEliminados: criteriosEliminados,
          newEscala: escala,
          identificacion: Cookies.get("identificacion"),
        }
      );
      setAdvice(response.data.message);
      setOpen(!open);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAdvice(error.response.data.error);
      } else {
        setAdvice("Error al guardar");
      }
      setOpen(true);
    }
  };

  const eliminarRubrica = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/elimar_rubrica/",
        {
          id: rubricaId,
        }
      );
      setAdvice(response.data.message);
      setOpen(!open);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setAdvice(error.response.data.error);
      } else {
        setAdvice("Error al eliminar");
      }
      setOpen(true);
    }
  };

  return (
    <div className="TablaRubricasContainer">
      <div className="NavBar">
        <NavbarProfesor />
      </div>
      <div className="Rubricas">
        <div className="TitleTablaRubricas">
          <h1>{rubrica.nombre}</h1>
          <div className="EscalaTitleTablaRubricas">
            <Field
              value={escala}
              CampoColor="black"
              Tipo="Number"
              onChange={handleEscalaChange}
            />
          </div>
        </div>
        <div className="TablaRubricas">
          <table className="table-evaluation">
            <thead>
              <tr>
                <th colSpan={2}>
                  <h1>{rubrica.nombre}</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {criterios.map((criterio) => (
                <tr key={criterio.id}>
                  <td className="inputs-rubricas">
                    <div className="RubricasTableBody Left">
                      <Field
                        Tipo="text"
                        value={criterio.descripcion}
                        name="descripcion"
                        onChange={(e) =>
                          handleCriterioChange(
                            criterio.id,
                            "descripcion",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </td>
                  <td className="ThActions">
                    <div className="delete-button-rubricas">
                      <button
                        className="DeleteButton"
                        onClick={() => eliminarCriterio(criterio.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 35, color: "red" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ButtonAgregarRubricas">
          <button onClick={agregarCriterio}>
            <AddIcon />
          </button>
        </div>
        {iniciada && rubrica.autor != "admin" ? (
          <div className="iniciada">
            <h2>
              Esta rubrica esta asignada a una evaluacion, no se pueden editar
              los parámetros
            </h2>
          </div>
        ) : (
          <div className="ButtonGuardarRubricas">
            <Button
              Boton="Guardar"
              color="rgb(15, 65, 118)"
              fontColor="white"
              onClick={guardarRubrica}
            />
            <Button
              Boton="Eliminar"
              color="rgb(171, 57, 33)"
              fontColor="white"
              onClick={eliminarRubrica}
            />
          </div>
        )}
      </div>
      <div>
        <PopUp
          open={open}
          SetOpen={setOpen}
          Advice={advice}
          Width={"100%"}
          Button1="volver"
          onClick1={volver}
        />
      </div>
    </div>
  );
}

export default TablaRubricasProfe;
