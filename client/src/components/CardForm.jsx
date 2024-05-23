import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import "./CardForm.css";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CardForm(props) {

          
    const [open, setOpen] = useState(false);
    const [profesores, setProfesores] = useState([]);

    useEffect(() => {
        const fetchStudentCourses = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8000/profesores/"
            );
            const usernames = response.data.profesores.map(profesor => profesor.user.username);
            setProfesores(usernames);
          } catch (error) {
            console.error("Error al obtener los profesores:", error);
          }
        };
        fetchStudentCourses();
      }, []);

    const handleCombo = () => {
        setOpen(!open);
    };

    CardForm.propTypes = {
        Title: PropTypes.string,
        Label1: PropTypes.string,
        Label2: PropTypes.string,
        Label3: PropTypes.string,
        Label4: PropTypes.string,
        Label5: PropTypes.string,
        Combo: PropTypes.bool,
       
    }

    return (
        
        <div className="Contenedor">

            <div className="ContainerCardForm">
                <div className="CardForm">
                    <div className="TitleCardForm">
                        <h1><b>{props.Title}</b></h1>
                    </div>
                    <div className="FormCardForm">
                        <form>
                            {props.Label1 ? <div className="Input NombreForm">
                                <h2>{props.Label1}</h2>
                                <Field 
                                onChange={props.onChangeField1}
                                Campo={`${props.Field1}`}
                                Tipo={`${props.Type1}`}
                                value={props.valueField1}
                                />
                            </div> : null}
                            {props.Label2 ? <div className="Input CodigoForm">
                                <h2 htmlFor="Codigo">{props.Label2}</h2>
                                <Field 
                                onChange={props.onChangeField2}
                                Campo={`${props.Field2}`}
                                Tipo={`${props.Type2}`}
                                value={props.valueField2} />
                            </div> : null}
                            {props.Label3 ? <div className="Input ProfesorForm">
                                <h2 htmlFor="Profesor">{props.Label3}</h2>

                                {props.Combo ? <Autocomplete open={open} clearOnBlur={false} clearOnEscape={false}
                                    sx={{
                                        display: 'flex',
                                        '& input': {
                                            width: '100%',
                                            bgcolor: 'background.paper',
                                            padding: '10px',
                                            fontSize: '1.3rem',
                                            borderRadius: '15px',
                                            color: (theme) =>
                                                theme.palette.getContrastText(theme.palette.background.paper),
                                        },
                                    }}
                                    id="custom-input-demo"
                                    options={profesores}    
                                    renderInput={(params) => (
                                        console.log(params.inputProps.value),
                                        Cookies.set('profesor', params.inputProps.value),
                                        <div className="InputContenedor" style={{ width: '100%' }} ref={params.InputProps.ref}>
                                            <input className="ComboInput" value={params.inputProps.value} type="text" {...params.inputProps} required onClick={() => setOpen(false)} />
                                            <SearchIcon
                                                sx={{ transition: 'all 0.3s ease', fontSize: '2rem', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', '&:hover': { transform: 'scale(1.2) translateY(-50%)', transition: 'all 0.3s ease', cursor: 'pointer' } }} onClick={(event) => { event.preventDefault(); const input = event.target.parentNode.firstChild; input.focus(); handleCombo(); }} {...params.inputProps}
                                            />
                                        </div>
                                    )}
                                /> : <Field  onChange={props.onChangeField3}
                                Campo={`${props.Field3}`}
                                Tipo={`${props.Type3}`}
                                value={props.valueField3} />}

                            </div> : null}
                            {props.Label4 ? <div className="Input AñoForm">
                                <h2 htmlFor="Año">{props.Label4}</h2>
                                <Field Tipo={props.Type4}
                                value={props.valueField4}
                                onChange={props.onChangeField4}
                                Campo={`${props.Field4}`} />
                            </div> : null}
                            
                            {props.Label5 ? <div className="Input SemestreForm">
                                <h2 htmlFor="Semestre">{props.Label5}</h2>
                                <Field Tipo="text" />
                            </div> : null}
                            <Button LineaBoton={false} Boton="Registrar" color="rgb(15, 65, 117)" fontColor="white" onClick={props.onClick} />
                        </form>
                        {props.Title === "Agregar Curso" ? <button className="AgregarEstudiantes">Agregar estudiantes</button> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardForm;