import multer from "multer";
import { __dirname } from "../path.js";

const storageProducts = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, `${__dirname}/public/img/products`) //Atributo 1: Carpeta donde va aguardar las img
    },
    filename: (req,file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //Atributo 2: Como nombre usa la fecha concatenada con el nombre del archivo
    }
    
})

export const uploadProducts = multer({storage: storageProducts}) //Middleware