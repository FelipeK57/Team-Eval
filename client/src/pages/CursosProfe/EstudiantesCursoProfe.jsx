import "./EstudiantesCursoProfe.css"
import NavbarProfesor from "../../components/NavbarProfesor";
import Search from '@mui/icons-material/Search';
import Field from "../../components/Utilities/Field";
import { useState } from "react";
import ListItems from "../../components/Utilities/ListItems";

function EstudiantesCursoProfe() {
    const [searchCursos, setSearchCursos] = useState(false);
    return (
        <div className="EstudiantesCursoProfeContainer">
            <div className="NavBar">
                <NavbarProfesor />
            </div>
            <div className="EstudiantesCursoTitle">
                <h1>Estudiantes</h1>

                <div className="SearchEstudiantes">
                    <button className="SearchButtonEstudiantes" onClick={""}>
                        <Search sx={{ fontSize: 30, color: "white" }} />
                    </button>
                    <div className={searchCursos === true ? "SearchFieldEstudiantes Active" : "SearchFieldEstudiantes Inactive"} onBlur={""}>
                        <Field
                            LineaBoton={false}
                            Boton=""
                            color="rgb(15, 65, 118)"
                            fontColor="white"
                            onChange={""}

                            value={""}
                        />
                    </div>
                </div>
            </div>
            <div className="ListaEstudiantes">
                <div>
                    <ListItems
                        Nombre1={"Nombre estudiante"}
                        Codigo1={"Codigo estudiante"}
                        onClickEdit={""}
                        onClickDelete={""}
                        Buttons={true}
                        Grupo={"Este es el grupo al que pertenece el estudiante"}
                    />
                </div>
            </div>

        </div>
    );
}

export default EstudiantesCursoProfe;