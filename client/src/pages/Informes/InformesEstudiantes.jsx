import NavbarStudent from "../../components/NavbarStudent";
import Cookies from "js-cookie";
import CursoModelo from "../../components/CursoModulo";
import { useState} from "react";

function InformesEstudiantes() {

    const [cursos, setCursos] = useState([]);

    return (
        <div className="Contenedor">
            <NavbarStudent />
            <div className="cursi">
                <h1>
                    Informes de <b>{Cookies.get("nombre")}</b>
                </h1>
            </div>
            <div className="cardi">
                {cursos.map((curso) => (
                    <div key={curso.id}>
                        <CursoModelo name={curso.nombre} state={curso.estado} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InformesEstudiantes