import { Router } from "express"

import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";
import { authorization } from "../config/middlewares.js";

const productsRouter = Router()

//GET
productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProduct)

//POST
productsRouter.post('/', authorization("Admin"), postProduct)

//UPDATE
productsRouter.put('/:pid',  authorization("Admin"), updateProduct)

//DELETE
productsRouter.delete('/:pid',  authorization("Admin"), deleteProduct)

export default productsRouter