const socket = io() //Instancia socket.io

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
let user

//Sweet alert
Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Por favor ingrese su nombre de usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

//Cuando hay algun cambio en el input, evento Change
chatBox.addEventListener('change', (e) => {

    if (chatBox.value.trim().length > 0) { 
        socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
        chatBox.value = ""
    }
})

socket.on('respuesta', info => {
    messageLogs.innerHTML = ""
    //Recorro el array de mensajes, mostrandolo
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})