import { Router } from "express"
import crypto from 'crypto'
import {__dirname} from '../path.js'
import {promises as fs} from 'fs';
import path from 'path';

const productsRouter = Router()

const productosPath = path.resolve(__dirname, '../src/db/productos.json')

const data = await fs.readFile(productosPath, 'utf-8');
const productos = JSON.parse(data)

//GET
productsRouter.get('/', (req,res) => {
    const {limit} = req.query
    const productosLimit = productos.slice(0, limit)
    res.status(200).send(productosLimit)
})

productsRouter.get('/:pid', (req,res) => {
    const idProducto = req.params.pid
    const producto = productos.find(prod => prod.id == idProducto)

    if(producto) {
        res.status(200).send(producto)
    } else {
        res.status(404).send({mensaje: "El producto no existe"})
    }
})

//POST
productsRouter.post('/', async (req,res) => {
    const {title, description, code, price, stock, category} = req.body
    const producto = {
        id: crypto.randomBytes(10).toString('hex'),
        title: title,
        description: description,
        code: code,
        price: price,
        status: true,
        stock: stock,
        category: category,
        thumbnails: []
    }
    productos.push(producto)
    await fs.writeFile(productosPath, JSON.stringify(productos))
    res.status(201).send({mensaje: `Se ha creado el producto con el id: ${producto.id} !`})
})

//PUT
productsRouter.put('/:pid', async (req,res) => {
    const idProducto = req.params.pid
    const {title, description, code, price, stock, category,status} = req.body
    const ind = productos.findIndex(prod => prod.id == idProducto)
    if (ind != -1) {
        productos[ind].title = title
        productos[ind].description = description
        productos[ind].code = code
        productos[ind].price = price
        productos[ind].stock = stock
        productos[ind].category = category
        productos[ind].status = status
        await fs.writeFile(productosPath, JSON.stringify(productos))
        res.status(200).send({mensaje: `Se ha actualizado el producto de id: ${productos[ind].id} !`})
    }else{
        res.status(404).send({mensaje: "El producto no existe"})    
    }
})

//DELETE
productsRouter.delete('/:pid', async (req,res) => {
    const idProducto = req.params.pid
    const ind = productos.findIndex(prod => prod.id == idProducto)
    if (ind != -1) {
        productos.splice(ind,1)
        await fs.writeFile(productosPath, JSON.stringify(productos))
        res.status(200).send({mensaje: "Se ha eliminado el producto"})
    }else{
        res.status(404).send({mensaje: "El producto no existe"})
    }
})

export default productsRouter