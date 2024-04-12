import React, { useEffect, useState } from "react";
import { getAllCursos } from "../api/cursos.api";
import { CursosCard } from "./CursosCard";

export const CursosList = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function loadCursos() {
      const res = await getAllCursos();
      setCursos(res.data);
    }
    loadCursos();
  }, []);

  return (
    <div>
      {cursos.map((cursos) => (
        <CursosCard key={cursos.id} curso={cursos} />
      ))}
    </div>
  );
};
