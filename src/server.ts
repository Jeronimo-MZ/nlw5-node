import express from "express";
import "./database";

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (request, response) => {
    return response.json({ message: "Olá, NLW 05" });
});

app.post("/users", (request, response) => {
    return response.json({ message: "usuário salvo com sucesso" });
});

app.listen(PORT, () => {
    console.log("Server in running on port:", PORT);
});
