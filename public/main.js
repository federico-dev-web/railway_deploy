

const socket = io()

//mensaje para volver a renderizar la tabla de productos (se ejecuta en la primer conexión y cuando se agrega un nuevo porducto por cualquier cliente)
socket.on('productos', (prods) => {
    if (prods.length) {
        const html = `
        <h2 style="color:crimson;"> Lista de productos </h2>
            <div>
                <table class="table table-dark">
                    <tr>
                        <th> Title </th>
                        <th> Price </th>
                        <th> thumbnail </th>
                    </tr>
                    ${ prods.map(item => {
                        return `<tr>
                                    <td> ${item.title} </td>
                                    <td> ${item.price} </td>
                                    <td> <img src=${item.thumbnail} width="50" height="50" /></td>
                                </tr>`
                        }).join(" ")  
                    }
                </table>`
            return document.getElementById("productos").innerHTML = html
    } else {
        const html = `<h3 class="alert alert-danger"> No hay productos cargados</h3>`
        return document.getElementById("productos").innerHTML = html
    }
})

//mensaje para volver a renderizar el chat
socket.on('mensajes', (msjs) => {

    //Desnormalizacion de mensaje
    const mensajes = {
        result: msjs[0].result,
        entities: msjs[0].entities
    }

    const mensajesDenormalizado = normalizr.denormalize(mensajes.result, chat, mensajes.entities)

    const mensajeRender = mensajesDenormalizado.mensajes

    //largo de mensajes y % de compresion
    const largoNorm = JSON.stringify(mensajes).length
    const largoDesnorm = JSON.stringify(mensajesDenormalizado).length
    const porcComp = largoNorm/largoDesnorm*100

    //renderizado de elementos
    if (mensajeRender.length) {
        const html = `
                    ${ mensajeRender.map(item => {
                        return `<div class="form-inline" >
                                    <span class="text-primary font-weight-bold mr-3" > ${item.author.email} </span>
                                    <span class="text-warning mr-3" > ${item.text.fyh} </span>
                                    <span class="text-success font-italic" > ${item.text.text} </span>
                                    <span class="text-success font-italic" > <img src=${item.author.avatar} width="30" height="30" />  </span>
                                </div>`
                        }).join(" ")  
                    }
                </table>`
            return [
                document.getElementById("chat").innerHTML = html ,
                document.getElementById("compresion").innerHTML = `Compresión: ${Math.round(porcComp * 100) / 100}%`
            ]
    } else {
        const html = `<h3 class="alert alert-danger"> No hay mensajes registrados</h3>`
        return document.getElementById("chat").innerHTML = html
    }
})


//funcion para ejecutar en el submit del formulario, la misma envia el nuevo objeto al servidor por websocket
const addProduct = async () => { 
    //Agrego una validacion para que los campos estén completos, sino no avanza
    if (!document.getElementById("title").value){
        return false
    }
    if (!document.getElementById("price").value){
        return false
    }
    if (!document.getElementById("thumbnail").value){
        return false
    }

    const nuevoProd = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
}


//funcion para enviar mensaje de chat
const newMessage = async () => { 
    //Agrego una validacion para que los campos estén completos, sino no avanza
    if (!document.getElementById("mail").value){
        return false
    }
    if (!document.getElementById("message").value){
        return false
    }
    let date = new Date()
    const nuevoMsj = {
        author: {
            email: document.getElementById("mail").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: Number(document.getElementById("edad").value),
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value
        },
        text: {
            text: document.getElementById("message").value,
            fyh: date
        }
    }
}


const author = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'});

const chat = new normalizr.schema.Entity('chat', { 
    mensajes: [ { author } ]
})

