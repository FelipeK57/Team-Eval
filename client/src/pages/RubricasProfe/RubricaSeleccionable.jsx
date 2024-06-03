import './RubricaSeleccionable.css'
function RubricaSeleccionable(props) {
    return (
        <div className="RubricaSeleccionableContainer">
            <div className="RubricaSeleccionable">
                <h2 className="NombreRubricaSeleccionable">{props.NombreRubrica}</h2>
            </div>
        </div>
    )
}

export default RubricaSeleccionable