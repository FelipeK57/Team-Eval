export function CursosCard({ curso }) {
  return (
    <div>
      <h2>Asignatura: {curso.nombre}</h2>
      <h3>Profesor: {curso.profesor}</h3>
    </div>
  );
}
