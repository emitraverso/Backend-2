import { Router } from "express"

import { postCart, getCart, addProdCart, deleteCart , deleteProdCart, updateProdsCart, updateQtyCart } from "../controllers/cartsController.js";

const cartsRouter = Router()

//GET
cartsRouter.get('/:cid', getCart)

//POST
cartsRouter.post('/', postCart)

cartsRouter.post('/:cid/product/:pid', addProdCart)

//PUT
cartsRouter.put('/:cid/product/:pid', updateQtyCart)

cartsRouter.put('/:cid', updateProdsCart)


//DELETE
cartsRouter.delete('/:cid/product/:pid', deleteProdCart)

cartsRouter.delete('/:cid', deleteCart)



export default cartsRouter