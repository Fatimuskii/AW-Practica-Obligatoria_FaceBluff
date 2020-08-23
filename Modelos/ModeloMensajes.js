"use strict";

const { resolveInclude, fileLoader } = require("ejs");

class ModeloMensajes {

    constructor(pool) {
        this.pool = pool;
    }

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
}

module.exports = ModeloMensajes; 