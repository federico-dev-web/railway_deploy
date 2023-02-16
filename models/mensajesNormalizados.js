import mongoose from 'mongoose'

const mensajesCollectionName = 'mensajesNormalizados'

const mensajesNormSchema = new mongoose.Schema({}, { strict: false })

export const mensajes = mongoose.model(mensajesCollectionName, mensajesNormSchema)