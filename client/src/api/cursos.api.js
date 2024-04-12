import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:8000/cursos/api/v1/cursos/",
});

export const getAllCursos = () => url.get("/");

export const createCursos = (curso) => url.post("/", curso);
