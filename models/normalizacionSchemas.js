import { schema } from 'normalizr'


const author = new schema.Entity('author', {}, {idAttribute: 'email'});

const chat = new schema.Entity('chat', { 
    mensajes: [ { author } ]
})

export {chat}