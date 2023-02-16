import mongoose from 'mongoose'

const mensajesCollectionName = 'usuariosYContrasenias'

const mensajesNormSchema = new mongoose.Schema({}, { strict: false })

export const mensajes = mongoose.model(mensajesCollectionName, mensajesNormSchema)