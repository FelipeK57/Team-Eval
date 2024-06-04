import NavbarProfesor from '../../components/NavbarProfesor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Field from '../../components/Utilities/Field';
import Button from '../../components/Utilities/Button';

function TablaRubricasProfe (props) {
    return(
        <div className="TablaRubricasContainer">
            <div className="NavBar">
                <NavbarProfesor/>
            </div>
            <div className="Rubricas">
                <div className="TitleTablaRubricas">
                    <h1>{props.Title}</h1>
                </div>
                <div className="TablaRubricas">
                    <table className="RubricasTable">
                        <tr>
                            <th className="thuno"><div className="RubricasTableHeader uno"><h1>{props.Nombre}</h1></div></th>
                            <th className="thdos"><div className="RubricasTableHeader dos"><h1>Valor</h1></div></th>
                        </tr>
                        <tr>
                            <td className="thleft"><div className="RubricasTableBody Left"><Field Tipo="text" name="name"/></div></td>
                            <td className="thright"><div className="RubricasTableBody Right"><Field Tipo="Number" name="name"/></div></td>
                        </tr>
                        <tr>
                            <td className="thleft"><div className="RubricasTableBody Left finalLeft"><Field Tipo="text" name="name"/></div></td>
                            <td className="thright"><div className="RubricasTableBody Right finalRight"><Field Tipo="Number" name="name"/></div></td>
                        </tr>
                    </table>
                    <div className="ButtonTablaRubricas">
                        <button className="DeleteButton"><DeleteIcon sx={{ fontSize: 35, color: "red" }} /></button>
                    </div>
                </div>
                <div className="ButtonAgregarRubricas">
                    <button><AddIcon/></button>
                </div>
                <div className="ButtonGuardarRubricas">
                    <Button Boton="Guardar" color="rgb(15, 65, 118)" fontColor="white"/>
                </div>
            </div>
        </div>
    )
}

export default TablaRubricasProfe;