import React from "react";
import "../pages/Estudiantes/EvaluacionEstudiantes.css"

function TablaEval({ data }) {
  return (
    <div className="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Criterios</th>
            <th colspan="4">Escala</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td className="scale"><button>1</button></td>
              <td className="scale"><button>2</button></td>
              <td className="scale"><button>3</button></td>
              <td className="scale"><button>4</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEval;
