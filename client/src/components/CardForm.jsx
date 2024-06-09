import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import "./CardForm.css";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CardForm(props) {
  const [open, setOpen] = useState(false);
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profesores/");
        const profesoresData = response.data.profesores.map(profesor => ({
          id: profesor.id,
          name: `${profesor.user.first_name} ${profesor.user.last_name}`
        }));
        setProfesores(profesoresData);

        // Obtener el valor inicial de las cookies
        const profesorId = Cookies.get("profesor_id");
        if (profesorId) {
          const selected = profesoresData.find(prof => prof.id === parseInt(profesorId));
          if (selected) {
            setSelectedProfesor(selected);
          }
        }
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchProfesores();
  }, []);

  const handleCombo = () => {
    setOpen(!open);
  };

  const handleProfesorChange = (event, newValue) => {
    if (newValue) {
      Cookies.set("profesor_id", newValue.id, { expires: 1 });
      props.onChangeField3(newValue);
    }
  };

  CardForm.propTypes = {
    Title: PropTypes.string,
    Label1: PropTypes.string,
    Label2: PropTypes.string,
    Label3: PropTypes.string,
    Label4: PropTypes.string,
    Label5: PropTypes.string,
    Combo: PropTypes.bool,
    onChangeField1: PropTypes.func,
    onChangeField2: PropTypes.func,
    onChangeField3: PropTypes.func,
    onChangeField4: PropTypes.func,
    onChangeField5: PropTypes.func,
    Field1: PropTypes.string,
    Field2: PropTypes.string,
    Field3: PropTypes.string,
    Field4: PropTypes.string,
    Field5: PropTypes.string,
    Type1: PropTypes.string,
    Type2: PropTypes.string,
    Type3: PropTypes.string,
    Type4: PropTypes.string,
    Type5: PropTypes.string,
    valueField1: PropTypes.string,
    valueField2: PropTypes.string,
    valueField3: PropTypes.string,
    valueField4: PropTypes.string,
    valueField5: PropTypes.string,
    onClick: PropTypes.func,
    Btn2: PropTypes.bool,
    Btn3: PropTypes.bool,
    Btn4: PropTypes.bool,
    redirect: PropTypes.string,
    onClick2: PropTypes.func,
    onClick3: PropTypes.func,
  };

  return (
    <div className="Contenedor">
      <div className="ContainerCardForm">
        <div className="CardForm">
          <div className="TitleCardForm">
            <h1>
              <b>{props.Title}</b>
            </h1>
          </div>
          <div className="FormCardForm">
            <form>
              {props.Label1 ? (
                <div className="Input NombreForm">
                  <h2>{props.Label1}</h2>
                  <Field
                    onChange={props.onChangeField1}
                    Campo={`${props.Field1}`}
                    Tipo={`${props.Type1}`}
                    value={props.valueField1}
                  />
                </div>
              ) : null}
              {props.Label2 ? (
                <div className="Input CodigoForm">
                  <h2 htmlFor="Codigo">{props.Label2}</h2>
                  <Field
                    onChange={props.onChangeField2}
                    Campo={`${props.Field2}`}
                    Tipo={`${props.Type2}`}
                    value={props.valueField2}
                  />
                </div>
              ) : null}
              {props.Label3 ? (
                <div className="Input ProfesorForm">
                  <h2 htmlFor="Profesor">{props.Label3}</h2>
                  {props.Combo ? (
                    <Autocomplete
                      open={open}
                      clearOnBlur={false}
                      clearOnEscape={false}
                      value={props.valueField3}
                      sx={{
                        display: "flex",
                        "& input": {
                          width: "100%",
                          bgcolor: "background.paper",
                          padding: "10px",
                          fontSize: "1.3rem",
                          borderRadius: "15px",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        },
                      }}
                      id="custom-input-demo"
                      options={profesores}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <div style={{ position: "relative", width: "100%" }}>
                          <TextField
                            {...params}
                            className="ComboInput"
                            required
                            variant="outlined"
                          />
                          <SearchIcon
                            sx={{
                              transition: "all 0.3s ease",
                              fontSize: "2rem",
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              "&:hover": {
                                transform: "scale(1.2) translateY(-50%)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                              },
                            }}
                            onClick={(event) => {
                              event.preventDefault();
                              handleCombo();
                            }}
                          />
                        </div>
                      )}
                      onChange={handleProfesorChange}
                    />
                  ) : (
                    <Field
                      onChange={props.onChangeField3}
                      Campo={`${props.Field3}`}
                      Tipo={`${props.Type3}`}
                      value={props.valueField3}
                    />
                  )}
                </div>
              ) : null}
              {props.Label4 ? (
                <div className="Input AñoForm">
                  <h2 htmlFor="Año">{props.Label4}</h2>
                  <Field
                    Tipo={props.Type4}
                    value={props.valueField4}
                    onChange={props.onChangeField4}
                    Campo={`${props.Field4}`}
                  />
                </div>
              ) : null}
              {props.Label5 ? (
                <div className="Input SemestreForm">
                  <h2 htmlFor="Semestre">{props.Label5}</h2>
                  <Field Tipo="text" />
                </div>
              ) : null}
              <Button
                LineaBoton={false}
                Boton="Registrar"
                color="rgb(15, 65, 117)"
                fontColor="white"
                onClick={props.onClick}
              />
            </form>
            {props.Btn2 ? (
              <button onClick={props.redirect} className="AgregarEstudiantes">
                Importar estudiantes
              </button>
            ) : null}
            {props.Btn3 ? (
              <button onClick={props.onClick2} className="AgregarEstudiantes2">
                Agregar estudiantes
              </button>
            ) : null}

            {props.Btn4 ? (
              <button onClick={props.onClick3} className="AgregarEstudiantes3">
                gestionar estudiantes
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardForm;


