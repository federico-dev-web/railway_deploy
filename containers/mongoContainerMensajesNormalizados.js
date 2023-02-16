import mongoose from 'mongoose'
import * as models from "../models/mensajesNormalizados.js";

//conexion a la db local    


const conexion = async () => { 
    const URL = "mongodb+srv://coderhouse:coderhouse@desafiologin.ymi5ngo.mongodb.net/ecommerce"
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


class mongoMensajesNorm {
    constructor(nombre){
        this.nombre = nombre
    }
    async insertarMensaje(mensaje) {
        //Devuelve todos los mensajes
        await conexion()
        await models.mensajes.deleteMany({})
        await models.mensajes.create( [ mensaje ] )
        mongoose.disconnect()
    }

    async listarMensajes() {
        await conexion()
        let res = await models.mensajes.find()
        mongoose.disconnect()
        return res
}
}

export default mongoMensajesNorm
