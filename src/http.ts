import express from "express";
import "./database";
import { createServer } from "http";
import { Socket, Server } from "socket.io";
import path from "path";

import { routes } from "./routes";

const app = express();
const PUBLIC = path.resolve(__dirname, "..", "public");

// servindo arquivos estáticos
app.use(express.static(PUBLIC));
app.set("views", PUBLIC);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    response.render("html/client.html");
});

const http = createServer(app); // criando protocolo http
const io = new Server(http); // Criando protocolo ws (Web Socket)

io.on("connection", (socket: Socket) => {
    console.log("se conectou:", socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };
