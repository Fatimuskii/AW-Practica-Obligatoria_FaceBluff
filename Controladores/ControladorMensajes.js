"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

//Declaracion de modelo/s que necesitamos para realizar las consultas con bbdd
const modeloMensajes = require("../Modelos/ModeloMensajes");
let oModeloMensajes = new modeloMensajes(pool);



//Exportación
module.exports ={

}; 