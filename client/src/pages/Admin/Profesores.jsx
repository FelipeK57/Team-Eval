import List from '../../components/List';
import NoQuieroCrearMasNavbars from '../../components/NavBar';

function Profesores() {
    return (
        <div className="Container">
            <div className="NavBar">
                <NoQuieroCrearMasNavbars />
            </div>
            <List Title="Profesores"
                Nombre1="Nombre" 
                Codigo1="Codigo"
                OnClickEdit="Editar" 
                OnClickDelete="Eliminar"
                Buttons={true}/>
        </div>
    )
}

export default Profesores;