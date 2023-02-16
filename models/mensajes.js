import mongoose from 'mongoose'

const mensajesCollectionName = 'mensajes'

const mensajesSchema = new mongoose.Schema({
    author: {
        email: {type: String}, 
        nombre: {type: String}, 
        apellido: {type: String},
        edad: {type: Number},
        alias: {type: String},
        avatar: {type: String},
    },
    text: {
        text: {type: String},
        fyh: {type: String}
    }
})

export const mensajes = mongoose.model(mensajesCollectionName, mensajesSchema)