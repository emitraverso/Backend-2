import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from './routes/sessions.routes.js'
import mongoose from 'mongoose';
import { create } from 'express-handlebars';
import path from 'path';
import { __dirname } from './path.js'; 
import passport from 'passport'
import initalizatePassport from './config/passport.config.js'
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express()
const PORT = 8080
const hbs = create()

//Middlewares
app.use(express.json())
app.use(cookieParser("CookieSecret")) 
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://emitraverso:mPd6rrgxm8AhL3jO@cluster0.gprfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        mongoOptions: {},
        ttl: 15
    }),    
    secret: 'SessionSecret',
    resave: true,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://emitraverso:mPd6rrgxm8AhL3jO@cluster0.gprfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB conectada"))
.catch((e) => console.log("Error al conectar a DB:", e))


initalizatePassport()
app.use(passport.initialize())
app.use(passport.session())

//Handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Directorio de vistas
app.set('views', path.join(__dirname, 'views'))
app.use('/public', express.static(__dirname + '/public')) //Carpeta publica como destino de archivos estaticos


//Rutas
app.use('/api/sessions', sessionRouter)
app.use('/api/public', express.static(__dirname+'/public')) //Carpeta publica como destino de archivos estaticos
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.get('/', (req,res) => {
    res.status(200).send("Bienvenido!")
})


app.listen(PORT, () => {
    console.log("Server on port", PORT)
})

