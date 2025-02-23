import 'dotenv/config'
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
app.use(cookieParser(process.env.SECRET_COOKIE)) 
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        mongoOptions: {},
        ttl: 15000000
    }),    
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

mongoose.connect(process.env.URL_MONGO)
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
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.get('/', (req,res) => {
    res.status(200).send("Bienvenido!")
})


app.listen(PORT, () => {
    console.log("Server on port", PORT)
})

