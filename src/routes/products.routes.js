import { Router } from "express"

import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";


const productsRouter = Router()

//GET
productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProduct)

//POST
productsRouter.post('/', postProduct)

//PUT
productsRouter.put('/:pid', updateProduct)

//DELETE
productsRouter.delete('/:pid', deleteProduct)

export default productsRouter