import { Router } from "express"

import { postCart, getCart, addProdCart, deleteCart , deleteProdCart, updateProdsCart, updateQtyCart, checkout } from "../controllers/cartsController.js";
import { authorization } from "../config/middlewares.js";

const cartsRouter = Router()

//GET
cartsRouter.get('/:cid', getCart)

//POST
cartsRouter.post('/', authorization("Usuario"), postCart)
cartsRouter.post('/:cid/product/:pid', authorization("Usuario"), addProdCart)

cartsRouter.post('/:cid/checkout', authorization("Usuario"), checkout)

//PUT
cartsRouter.put('/:cid/product/:pid', authorization("Usuario"), updateQtyCart)
cartsRouter.put('/:cid', authorization("Usuario"), updateProdsCart)

//DELETE
cartsRouter.delete('/:cid/product/:pid', authorization("Usuario"), deleteProdCart)
cartsRouter.delete('/:cid', authorization("Usuario"), deleteCart)



export default cartsRouter