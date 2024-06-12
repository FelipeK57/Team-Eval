import { Edit } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import NoQuieroCrearMasNavbars from "../../components/NoQuieroCrearMasNavbars";
import LargeButton from "../../components/Utilities/LargeButton";
import "./Rubricas.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from 'react';

function Rubricas() {

    const navigate = useNavigate();
    const [rubricapre, setRubricapre] = useState([]);



    useEffect(() => {
        const fetchRubrica = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8000/rubricasAdmin/"             
            );
            console.log(response.data)
            setRubricapre(response.data.predeterminada);
          } catch (error) {
            console.error("Error al obtener la rubrica", error);
          }
        };
        fetchRubrica();
      }, []);

   
      const Rubrica = (rubricaId) => {
        navigate(`/TablaRubricas/${rubricaId}`);
    }


    return (
        <div className="RubricasContainer">
            <NoQuieroCrearMasNavbars />
            <div className="TitleRubricas">
                <h1>Editar Rubricas </h1>
            </div>
            <div className="OpcionesRubricas">
                <div className="NombreRubricas">
                    <h1>Rubrica predeterminada</h1>
                </div>
                <div className="OpcionRubricas">
                    <LargeButton icon={<Edit />} text={rubricapre.nombre} OnClick={() => Rubrica(rubricapre.id)} />
                </div>
            </div>
        </div>
    )
}

export default Rubricas;