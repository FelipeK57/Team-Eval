import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <Link to="/cursos">
        <h1>Cursos app</h1>
      </Link>
      <Link to="/cursos-create">Create cursos</Link>
    </div>
  );
};
