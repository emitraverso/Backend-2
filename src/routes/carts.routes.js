import { Router } from "express"

import { postCart } from "../controllers/carts.controller.js";
import { getCart } from "../controllers/carts.controller.js";
import { addProdCart } from "../controllers/carts.controller.js";
import { deleteCart } from "../controllers/carts.controller.js";
import { deleteProdCart } from "../controllers/carts.controller.js";
import { updateProdsCart } from "../controllers/carts.controller.js";
import { updateQtyCart } from "../controllers/carts.controller.js";

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