import List from "../../components/List";
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
function Cursos() {
    return (
        <div className="Container">
            <div className="NavBar">
                <NoQuieroCrearMasNavbars />
            </div>
            <List Title="Cursos"
                Nombre1="Nombre" 
                Codigo1="Codigo"
                OnClickEdit="Editar" 
                OnClickDelete="Eliminar"
                Buttons={true}/>
        </div>
    );
}
export default Cursos