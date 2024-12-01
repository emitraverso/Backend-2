import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import chatRouter from './routes/chat.routes.js'
import path from 'path'
import { __dirname } from './path.js'
import multerRouter from './routes/images.routes.js'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'


const app = express()
const hbs = create()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log("Server on port", PORT)
})

//Iniciar Socket.io en el servidor
const io = new Server(server)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', hbs.engine) //registra un nuevo motor de plantillas llamado "handlebars" y asocia la extensión .handlebars con el motor hbs.engine.
app.set('view engine', 'handlebars') //Define que "handlebars" será el motor que se usará por defecto para renderizar vistas.

//Directorio de vistas
app.set('views', path.join(__dirname, 'views'))

app.use('/public', express.static(__dirname + '/public')) //Carpeta publica como destino de archivos estaticos
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/upload', multerRouter)
app.use('/api/chat', chatRouter)
app.get('/', (req,res) => {
    res.status(200).send("Bienvenido!")
})

let mensajes = []

io.on('connection', (socket)=> { //socket es la info que llega de la conexion
    console.log('Usuario conectado ', socket.id)

    socket.on('mensaje', (data) => { //Recibe mensaje
        console.log('mensaje recibido', data)
        mensajes.push(data)
        socket.emit('respuesta', mensajes) //Responde
    })
 

    socket.on('disconnect', () => { //Detecta desconexion
        console.log('Usuario desconectado ', socket.id)
    })
    
})
