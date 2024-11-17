import { Router } from "express"
import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path';

const cartsRouter = Router()

const carritosPath = path.resolve(__dirname, '../src/db/carritos.json')

const data = await fs.readFile(carritosPath, 'utf-8');
const carritos = JSON.parse(data)

//GET
cartsRouter.get('/:cid', (req,res) => {
    const idCarrito = req.params.cid
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if(carrito) {
        res.status(200).send(carrito.products)
    } else {
        res.status(404).send({mensaje: "El carrito no existe"})
    }
})

//POST
cartsRouter.post('/', async (req,res) => {
    const carrito = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }
    carritos.push(carrito)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
    res.status(201).send({mensaje: `Se ha creado el carrito con el id: ${carrito.id} !`})
})

cartsRouter.post('/:cid/product/:pid', async (req,res) => {
    const idCarrito = req.params.cid
    const idProducto = req.params.pid
    const {quantity} = req.body
    const carrito = carritos.find(cart => cart.id == idCarrito)
    
    if (carrito) {
        const indProducto = carrito.products.findIndex(prod => prod.id == idProducto)
        if (indProducto != -1) {
            carrito.products[indProducto].quantity = quantity 
    
        }else{
            carrito.products.push({id: idProducto, quantity: quantity})
        }    
        await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send({mensaje: "Se ha actualzado el carrito !"})
    
    }else{
        res.status(404).send({mensaje: "El carrito no existe"})    
    }    
})


export default cartsRouter