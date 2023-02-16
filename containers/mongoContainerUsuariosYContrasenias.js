import mongoose from 'mongoose'
import * as models from "../models/usuariosYContrasenias.js"

//conexion a la db local    


const conexion = async () => { 
    const URL = "mongodb+srv://coderhouse:coderhouse@desafiologin.ymi5ngo.mongodb.net/ecommerce"
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


class mongoUsuariosYContrasenias {
    constructor(nombre){
        this.nombre = nombre
    }
    async insertarUsuario(mensaje) {
        //inserta un usuario
        await conexion()
        await models.mensajes.create( [ mensaje ])
        mongoose.disconnect()
    }

    async listarTodosLosUsuarios() {
        await conexion()
        let res = await models.mensajes.find()
        mongoose.disconnect()
        return res
}
}

export default mongoUsuariosYContrasenias
