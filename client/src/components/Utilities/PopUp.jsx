import { Dialog, DialogContent } from "@mui/material";
import ButtonCancel from "../../components/Utilities/ButtonCancel.jsx";
import Button from "../../components/Utilities/Button";
import PropTypes from "prop-types";
import "./PopUp.css";
function PopUp(props) {
  const popup = (e) => {
    e.preventDefault();
    props.SetOpen(!props.open);
  };

  PopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    SetOpen: PropTypes.func.isRequired,
    Advice: PropTypes.string.isRequired,
    Width: PropTypes.string.isRequired,
    Button1: PropTypes.string.isRequired,
    Button2: PropTypes.string,
  };

  return (
    <Dialog
      className="Dialog"
      open={props.open}
      onClose={popup}
      maxWidth="fit-content"
      sx={{
        backdropFilter: "blur(5px)",
        overflow: "hidden",
        padding: "0",
        margin: "0",
      }}
      PaperProps={{
        sx: {
          width: `${props.Width}`,
        },
      }}
    >
      <DialogContent className="Content">
        <div className="Advice">
          <div className="AdviceText">
            <h2>{props.Advice}</h2>
          </div>
          <div
            className="AdviceButtons"
            style={props.Button2 ? null : { justifyContent: "center" }}
          >
            <Button
              onClick={props.onClick1}
              LineaBoton={false}
              Boton={props.Button1}
              color={"White"}
              fontColor={"black"}
            />
            {props.Button2 ? (
              <ButtonCancel
                onClick={props.onClick2}
                LineaBoton={false}
                Boton={props.Button2}
                color={"#B60E0E"}
                fontColor={"white"}
              />
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default PopUp;
