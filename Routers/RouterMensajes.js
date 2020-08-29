"use strict";

const express = require("express");

const controladorMensajes = require("../Controladores/ControladorMensajes");

// Declaramos el Router "RouterMensajes"
const routerMensajes = express.Router();

routerMensajes.get("/", controladorMensajes.mostrarMensajes);
routerMensajes.get("/mostrarMensaje/:id", controladorMensajes.mostrarMensaje);
routerMensajes.get("/borrarMensaje/:id", controladorMensajes.eliminarMensaje);
routerMensajes.get("/enviarMensaje/:data", controladorMensajes.mostrarEnviarMensaje);

routerMensajes.post("/enviarMensaje", controladorMensajes.enviarMensaje);
module.exports = routerMensajes;



