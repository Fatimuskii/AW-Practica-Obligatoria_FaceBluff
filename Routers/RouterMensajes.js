"use strict";

const express = require("express");

const controladorMensajes = require("../Controladores/ControladorMensajes");

// Declaramos el Router "RouterMensajes"
const routerMensajes = express.Router();

routerMensajes.get("/ListadoMensajes", controladorMensajes.mostrarMensajes);

module.exports = routerMensajes;



