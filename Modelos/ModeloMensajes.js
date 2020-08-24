"use strict";

const { resolveInclude, fileLoader } = require("ejs");

class ModeloMensajes {

    constructor(pool) {
        this.pool = pool;
    }

    // Listar mensajes por id de usuario
    //@param Id_usuario : id del usuario del cual queremos cargar sus mensajes
    //@return mensajes: listado de mensajes de ese usuario

    listadoMensajesPorUsuario(Id_usuario, callback){

        this.pool.getConnection(function (err, connection) {

            if(err){
                callback(new Error("Error de conexión a la base de datos."));
            }

            else{
                connection.query("SELECT * FROM mensajes WHERE (id_to = ?)", 
                [Id_usuario], 
                function(err, result){

                    //Liberamos la conexión
                    connection.release(); 
                    if (err){
                        callback(new Error("Error al localizar los mensajes."), null);
                    } else{

                        let mensajes = [];

                        if(result.length >0){
                            result.forEach (men => mensajes.push({
                                id: men.id,
                                id_from: men.id_from,
                                nombreEmisor: men.nombreEmisor,
                                fecha: men.fecha.toLocaleDateString(),
                                hora : men.fecha.toLocaleTimeString(),
                                texto: men.texto
                            }))
                        }
    
                        callback(null, mensajes);
                    }
                });
            }

        });
    }

    // Carga todos los datos referentes a un id de un mensaje
    //@param id_mensaje: id del mensaje del cual queremos extraer los datos
    //@return obj mensaje con todos sus datos. 
    leerMensaje(id_mensaje, callback){

        this.pool.getConnection(function (err, connection) {
            if(err){
                callback(new Error("Error de conexión a la base de datos."));
            }

            else{
                connection.query("SELECT * FROM mensajes WHERE (id= ?)", 
                [id_mensaje], 
                function(err, result){
                    //Liberamos la conexión
                    connection.release(); 
                    if(err){
                        callback(new Error("Error al obtener datos del mensaje."), null);
                    }
                    else{
                        if(result.length ===0){
                            callback(new Error(`No existen datos con id= ${{id_mensaje}}.`), null);
                        }
                        else{

                            let mensaje ={
                                id: result[0].id,
                                id_from: result[0].id_from,
                                nombreEmisor: result[0].nombreEmisor,
                                fecha: result[0].fecha.toLocaleDateString(),
                                hora : result[0].fecha.toLocaleTimeString(),
                                texto: result[0].texto
                            }
                            callback(null, mensaje);
                        }
                    }
                });
            }

        });

    }

    // Borra todos los datos referentes a un mensaje
    //@param id_mensaje: id del mensaje del cual queremos borrar
    //@return con todos sus datos. 
    borrarMensaje(id_mensaje, callback){

        this.pool.getConnection(function (err, connection) {
            if(err){
                callback(new Error("Error de conexión a la base de datos."));
            }

            else{
                connection.query("DELETE FROM mensajes WHERE (id = ?)", 
                [id_mensaje], 
                function(err, result){
                    //Liberamos la conexión
                    connection.release(); 
                    if(err){
                        callback(new Error("Error al borrar mensaje."), null);
                    }
                    else{
            
                        callback(null, result);
                    }
                });
            }

        });

    }

}

module.exports = ModeloMensajes; 