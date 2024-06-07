import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./pages/Home/Home";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import HomeProfesor from "./pages/HomeProfesor/HomeProfesor";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import Curso from "./pages/CursosStudent/Curso";
import CursoP from "./pages/CursosProfe/CursoP";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin.jsx";
import ActualizacionCorreo from "./pages/ActualizacionCorreo/ActualizacionCorreo.jsx";
import ActualizacionCorreoP from "./pages/ActualizacionCorreo/ActualizarCorreoProfesor.jsx";
import ActualizarcorreoA from "./pages/ActualizacionCorreo/ActualizarcorreoA.jsx";
import AvisoCorreo from "./pages/ActualizacionCorreo/AvisoCorreo.jsx";
import CambiarContraseñaAdmin from "./pages/CambiarContraseña/CambiarContraseñaAdmin.jsx";
import CodigoVerificacion from "./pages/CambiarContraseña/CodigoVerificacion.jsx";
import VerificacionCorreo from "./pages/CambiarContraseña/VerificacionCorreo.jsx";
import CursosEstudiante from "./pages/HomeStudent/CursosEstudiante.jsx";
import MiCuentaP from "./pages/MiCuenta/MiCuentaP.jsx";
import MiCuentaA from "./pages/MiCuenta/MicuentaA.jsx";
import InformesEstudiantes from "./pages/Informes/InformesEstudiantes.jsx";
import AvisoContraseña from "./pages/CambiarContraseña/AvisoContraseña.jsx";
import AvisoCorreoP from "./pages/ActualizacionCorreo/AvisoCorreoP.jsx";
import AgregarProfesor from "./pages/Admin/AgregarProfesor.jsx";
import AgregarCurso from "./pages/Admin/AgregarCurso.jsx";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import Cursos from "./pages/Admin/Cursos.jsx";
import Profesores from "./pages/Admin/Profesores.jsx";
import ImportarCursos from "../src/pages/Home/ImportarCurso.jsx"
import EditarCurso from "./pages/Admin/EditarCurso.jsx";
import EstudiantesDeshabilitados from "./pages/Admin/EstudiantesDeshabilitados.jsx";
import Rubricas from "./pages/Admin/Rubricas.jsx";
import EstudiantesLista from "./pages/CursosProfe/EstudiantesLista.jsx";
import TablaRubricas from "./pages/Admin/TablaRubricas.jsx";
import Cookies from "js-cookie";
import ProfeEditar from "./pages/ProfeEditar/ProfeEditar";
import CursosDes from "./pages/CursosDes/CursosDes";
import ProfeDes from "./pages/ProfeDes/ProfeDes";
import EditarStudent from "./pages/CursosProfe/EditarStudent.jsx";
import ImportarEstudiantes from "./pages/Admin/ImportarEstudiantes.jsx";
import RubricasProfe from "./pages/RubricasProfe/RubricasProfe.jsx";
import TablaRubricasProfe from "./pages/RubricasProfe/TablaRubricasProfe.jsx";
import Grupos from "./pages/Grupos/Grupos";
import SeleccionarRubrica from "./pages/RubricasProfe/SeleccionarRubrica.jsx";
import NuevaRubrica from "./pages/RubricasProfe/NuevaRubrica.jsx";
import EvaluacionEstudiantes from "./pages/Estudiantes/EvaluacionEstudiantes.jsx";
import SeleccionEvaluacion from "./pages/Estudiantes/SeleccionEvaluacion.jsx";
import InformesProfe from "./pages/Informes/InformesProfe.jsx";
import GruposInformesProfe from "./pages/Informes/GruposInformesProfe.jsx";
import IntegrantesInformesProfe from "./pages/Informes/IntegrantesInformesProfe.jsx";
import CalificacionInformesProfe from "./pages/Informes/CalificacionInformesProfe.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Logins*/}
        <Route path="/login" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />

        {/*Actualizacion de correo*/}
        <Route path="/ActualizacionCorreo" element={<ActualizacionCorreo />} />
        <Route path="/ActualizacionCorreoP" element={<ActualizacionCorreoP />}/>
        <Route path="/ActualizarcorreoA" element={<ActualizarcorreoA />} />
        <Route path="/AvisoCorreo" element={<AvisoCorreo />} />
        <Route path="/AvisoCorreoP" element={<AvisoCorreoP />} />

        {/*Actualizacion de contraseña*/}
        <Route path="/VerificacionCorreo" element={<VerificacionCorreo />}/>
        <Route path="/CodigoVerificacion" element={<CodigoVerificacion />} />
  
        <Route path="/CambioContraAdmin" element={<CambiarContraseñaAdmin />} />
        <Route path="/AvisoContraseña" element={<AvisoContraseña />} />

        {/*Pagina Principale*/}
        <Route path="/" element={<Home />} />

        {/*Paginas Estudiante*/}
        <Route path="/Student" element={<HomeStudent />} />
        <Route path="/InformesEstudiante" element={<InformesEstudiantes />} />

        <Route path="/Profesor" element={<HomeProfesor />} />

        <Route path="/MiCuenta" element={<MiCuenta />} />

        {/*Paginas Profesor*/}
        <Route path="/Profesor" element={<HomeProfesor />} />
        <Route path="/MiCuentaP" element={<MiCuentaP />} />
        <Route path="/CursoP" element={<CursoP />} />
        <Route path="/Rubricas" element={<RubricasProfe />} />
        <Route path="/TablaRubricasProfe/:rubricaId" element={<TablaRubricasProfe />} />
        <Route path="/NuevaRubrica" element={<NuevaRubrica />} />
        <Route path="/Grupos/:cursoId" element={<Grupos materia="Matematicas"/>} />
        <Route path="/SeleccionarRubrica" element={<SeleccionarRubrica materia="Matematicas"/>} />
        <Route path="/InformesProfe" element={<InformesProfe materia="Matematicas"/>} />
        <Route path="/GruposInformesProfe" element={<GruposInformesProfe/>} />
        <Route path="/IntegrantesInformesProfe" element={<IntegrantesInformesProfe/>} />
        <Route path="/CalificacionInformesProfe" element={<CalificacionInformesProfe/>} />

        <Route path="/Cursos" element={<CursosEstudiante />} />
        <Route path="/Curso" element={<Curso />} />
        <Route path="/EditarStudent" element={<EditarStudent profesor={Cookies.get("StudentNombre")} />} />



        {/*Paginas de admin*/}
        <Route path="/agregarP" element={<AgregarProfesor />} />
        <Route path="/agregarC" element={<AgregarCurso />} />
        <Route path="/Admin" element={<HomeAdmin />} />
        <Route path="/MiCuentaA" element={<MiCuentaA />} />
        <Route path="/CursosAdmin" element={<Cursos />} />
        <Route path="/ProfesoresAdmin" element={<Profesores />} />
        <Route path="/ImportarCurso" element={<ImportarCursos />} />
        <Route path="/EditarCurso" element={<EditarCurso />} />
        <Route path="/EstudiantesDes" element={<EstudiantesDeshabilitados />} />
        <Route path="/RubricasAdmin" element={<Rubricas />} />
        <Route path="/EstudiantesLista" element={<EstudiantesLista />} />
        <Route path="/TablaRubricas/:rubricaId" element={<TablaRubricas Nombre="Respeto" />} />
        <Route path="/ProfeEditar" element= {<ProfeEditar profesor="Pedro Vargas"/>}/>
        <Route path="/CursosDes" element={<CursosDes />} />
        <Route path="/ProfeDes" element={<ProfeDes />} />
        <Route path="/ImportarEstudiantes" element={<ImportarEstudiantes />} />
  

        

        <Route path="/Evaluacion" element={<EvaluacionEstudiantes />} />
        <Route path="/SeleccionEvaluacion" element={<SeleccionEvaluacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
