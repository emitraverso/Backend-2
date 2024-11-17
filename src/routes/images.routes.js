import { Router } from "express";
import { uploadProducts } from "../config/multer.js";

const multerRouter = Router()

multerRouter.post('/products', uploadProducts.single('product'), (req,res) => {
    console.log(req)
    res.status(200).send("Imagen cargada")
})

export default multerRouter