import Field from "./Utilities/Field";
import Button from "./Utilities/Button";
import TypeWriter from "./Utilities/TypeWriter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Login2.css";
import { useState } from "react";
import PopUp from "../components/Utilities/PopUp.jsx";


function Login2(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const VolverClick = () => {
    navigate(`/${props.NavigateRoute}`);
  };

  const popup = (e) => {
    e.preventDefault();
    setOpen(!open);
};

const closePopup = () => {
  setOpen(false);
};


  Login2.propsTypes = {
    Title: PropTypes.string.isRequired,
    Type1: PropTypes.string.isRequired,
    Type2: PropTypes.string.isRequired,
    Field1: PropTypes.string.isRequired,
    Field2: PropTypes.string.isRequired,
    Button: PropTypes.string.isRequired,
    ForgotPassword: PropTypes.bool.isRequired,
    NavigateRoute: PropTypes.string.isRequired,
    setAdvice: PropTypes.func.isRequired, 
  };

  const handleButtonClick = async (e) => {
    await props.onClick(e, props.setAdvice, popup);
    };
  

  return (
    <div className="MainContainerAdmin">
      <div className="ContainerAdmin">
        <div className="BackAdmin">
          <button onClick={VolverClick} className="BackButtonAdmin">
            <ArrowBackIcon sx={{ color: "#0f4175", fontSize: "3rem" }} />
          </button>
        </div>
        <div className="TextContainerAdmin">
          <TypeWriter
            text="TeamEval"
            letterColor="rgb(15, 65, 118)"
            letterToChange1="T"
            letterToChange2="E"
            fontSize="3rem"
          />
          <h2 className="TextAdmin">
            ¡Bienvenido a TeamEval, haz que cada evaluación cuente en tu viaje
            educativo!
          </h2>
        </div>
        <div className="CardContainerAdmin">
          <div className="CardAdmin">
            <div className={`InAdmin EstudianteAdmin`}>
              <div className="TitleAdmin">
                <h1>{`${props.Title}`}</h1>
              </div>
              <form className="FormularioAdmin" onSubmit={popup}>
                <br />
                <Field
                  onChange={props.onChangeField1}
                  Campo={`${props.Field1}`}
                  Tipo={`${props.Type1}`}
                  value={props.valueField1}
                />
                <Field
                  onChange={props.onChangeField2}
                  Campo={`${props.Field2}`}
                  Tipo={`${props.Type2}`}
                  value={props.valueField2}
                />
                {props.ForgotPassword ? (
                  <Link to={"/VerificacionCorreo"}>Olvido su contraseña?</Link>
                ) : null}
                <Button
                  onClick={handleButtonClick}
                  LineaBoton={true}
                  Boton={`${props.Button}`}
                />
                 <div>
                  <PopUp open={open}
                SetOpen={setOpen}
                Advice={props.advice}
                Width={"100%"}
                Button1="volver"
               onClick1={closePopup}
                
                />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login2;
