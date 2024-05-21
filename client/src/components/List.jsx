import PropTypes from "prop-types";
import "./List.css";
import Button from "./Utilities/Button";
import ListItems from "./Utilities/ListItems";

function List(props) {
  List.propTypes = {
    Title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    Nombre1: PropTypes.string.isRequired,
    Codigo1: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    Buttons: PropTypes.bool.isRequired,
  };
  return (
    <div className="ContainerList">
      <div className="Title">
        <h1>{props.Title}</h1>
      </div>
      <div className="Search"></div>
      <div className="AgregarList">
        <Button
          LineaBoton={false}
          Boton="Agregar"
          onClick={props.onClick}
          color="rgb(15, 65, 118)"
          fontColor="white"
        />
      </div>
      <div className="L">
        <ListItems
          Nombre1={props.Nombre1}
          Codigo1={props.Codigo1}
          onClickEdit={props.onClickEdit}
          onClickDelete={props.onClickDelete}
          Buttons={props.Buttons}
        />
      </div>
    </div>
  );
}

export default List;
