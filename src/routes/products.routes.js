import { Router } from "express"

import { getProducts } from "../controllers/products.controller.js";
import { getProduct } from "../controllers/products.controller.js";
import { postProduct } from "../controllers/products.controller.js";
import { putProduct} from "../controllers/products.controller.js";
import { deleteProduct } from "../controllers/products.controller.js";

const productsRouter = Router()

//GET
productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProduct)

//POST
productsRouter.post('/', postProduct)

//PUT
productsRouter.put('/:pid', putProduct)

//DELETE
productsRouter.delete('/:pid', deleteProduct)

export default productsRouter