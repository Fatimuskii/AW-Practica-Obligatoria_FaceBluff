"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

//Declaracion de modelo/s que necesitamos para realizar las consultas con bbdd
const modeloMensajes = require("../Modelos/ModeloMensajes");
let oModeloMensajes = new modeloMensajes(pool);


function mostrarMensajes(request, response, next){

    oModeloMensajes.listadoMensajesPorUsuario(request.session.usuario.Id, function(err, mensajes){

        if (err) {
            next(err);
        } else {
            response.status(200);
            //response.setFlash("¡Tu respuesta ha sido añadida!");
            response.render("ListadoMensajes", { mensajes : mensajes});

        }

    });

}

function mostrarMensaje(request, response, next){
    
    oModeloMensajes.leerMensaje(request.params.id, function(err, mensaje){

        if(err){
            next(err);
        }else{
            response.status(200);
            response.render("PaginaDeMensaje", { mensaje : mensaje});
        }

    });
}

function eliminarMensaje(request, response, next){
    oModeloMensajes.borrarMensaje(request.params.id, function(err, res){

        if(err){
            next(err);
        }
        else{

            response.status(200);
            if(res.affectedRows>0){  
                response.setFlash("¡Se ha eliminado el mensaje!");  
            }
            response.redirect("/mensajes/");
        }
    });
}

function mostrarEnviarMensaje(request, response, next){

    let Id_amistad = request.params.data.split("+")[0];
    let nombre_amistad = request.params.data.split("+")[1];

    let receptor ={
        id : Id_amistad,
        nombre: nombre_amistad
    }
    response.status(200);
    response.render("PaginaEnviarMensaje", {receptor : receptor});

}

function enviarMensaje(request, response,next){

    // atributos necesarios para nuevo mensaje en la bd
    let mensaje ={
        id_from: request.session.usuario.Id,
        id_to: request.body.id_receptor,
        nombreEmisor: request.session.usuario.nombre,
        texto: request.body.texto
    }

    oModeloMensajes.enviarMensaje(mensaje, function(err, res){
        if(err){
            next(err);
        }
        else{

            response.status(200);
            if(res.insertId>0){  
                response.setFlash("¡Mensaje Enviado!");  
            }
            response.redirect("/mensajes/");
        }
    });

}



//Exportación
module.exports ={
    mostrarMensajes : mostrarMensajes,
    mostrarMensaje : mostrarMensaje, 
    eliminarMensaje: eliminarMensaje, 
    mostrarEnviarMensaje: mostrarEnviarMensaje, 
    enviarMensaje: enviarMensaje,
}; 