import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import "./CardForm.css";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

function CardForm(props) {

    const options = ['Antonio', 'David'];
    const [open, setOpen] = useState(false);

    const handleCombo = () => {
        setOpen(!open);
    };

    CardForm.propTypes = {
        Title: PropTypes.string.isRequired,
        Label1: PropTypes.string.isRequired,
        Label2: PropTypes.string.isRequired,
        Label3: PropTypes.string.isRequired,
        Label4: PropTypes.string.isRequired,
        Label5: PropTypes.string.isRequired,
        Combo: PropTypes.bool.isRequired
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
                                <Field Tipo="text" />
                            </div> : null}
                            {props.Label2 ? <div className="Input CodigoForm">
                                <h2 htmlFor="Codigo">{props.Label2}</h2>
                                <Field Tipo="text" />
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
                                    options={options}
                                    renderInput={(params) => (
                                        <div className="InputContenedor" style={{ width: '100%' }} ref={params.InputProps.ref}>
                                            <input className="ComboInput" type="text" {...params.inputProps} required onClick={() => setOpen(false)} />
                                            <SearchIcon
                                                sx={{ transition: 'all 0.3s ease', fontSize: '2rem', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', '&:hover': { transform: 'scale(1.2) translateY(-50%)', transition: 'all 0.3s ease', cursor: 'pointer' } }} onClick={(event) => { event.preventDefault(); const input = event.target.parentNode.firstChild; input.focus(); handleCombo(); }} {...params.inputProps}
                                            />
                                        </div>
                                    )}
                                /> : <Field Tipo="text" />}

                            </div> : null}
                            {props.Label4 ? <div className="Input AñoForm">
                                <h2 htmlFor="Año">{props.Label4}</h2>
                                <Field Tipo="text" />
                            </div> : null}
                            {props.Label5 ? <div className="Input SemestreForm">
                                <h2 htmlFor="Semestre">{props.Label5}</h2>
                                <Field Tipo="text" />
                            </div> : null}
                            <Button LineaBoton={false} Boton="Registrar" color="rgb(15, 65, 117)" fontColor="white" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardForm;