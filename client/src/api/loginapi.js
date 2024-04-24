import axios from  "axios";

const url = axios.create({
    baseURL: "http://127.0.0.1:8000/profesor/api/v1/profesor/",
});

export const getuser = () => url.get("/");

export  const login = (user) => url.post("/", user)