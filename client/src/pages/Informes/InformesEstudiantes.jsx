import NavbarStudent from "../../components/NavbarStudent";
import CursoModelo from "../../components/CursoModulo";
import Cookies from "js-cookie";

function InformesEstudiantes() {
    return (
        <div className="Contenedor">
            <NavbarStudent />
            <div className="cursi">
                <h1>
                    Informes de <b>{Cookies.get("nombre")}</b>
                </h1>
            </div>
            <div className="cardi">
                <div key={"#"}>
                    <CursoModelo name={"#"} state={true} />
                </div>
            </div>
        </div>
    );
}

export default InformesEstudiantes