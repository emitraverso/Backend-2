import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { __dirname } from './path.js'
import multerRouter from './routes/images.routes.js'

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + 'public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/upload', multerRouter)


app.listen(PORT, () => {
    console.log("Server on port", PORT)
})
