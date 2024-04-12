import { useForm } from "react-hook-form";
import { createCursos } from "../api/cursos.api";
import { useNavigate } from "react-router-dom";

export function CursosForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await createCursos(data);
    navigate("/");
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="nombre"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && <span>este campo es requerido</span>}
        <input
          type="text"
          placeholder="profesor"
          {...register("profesor", { required: true })}
        />
        {errors.profesor && <span>este campo es requerido</span>}
        <input
          type="number"
          placeholder="codigo"
          {...register("codigo", { required: true })}
        />
        {errors.codigo && <span>este campo es requerido</span>}
        <button>Guardar</button>
      </form>
    </div>
  );
}
