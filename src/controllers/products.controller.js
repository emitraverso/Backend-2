import productModel from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const { limit, page, filterMethod, filter, ord } = req.query

        const pagina = page || 1
        const limite = limit || 10
        const query = filterMethod && filter ? {[filterMethod]: filter} : {}
        const sort = ord === "asc" || ord === "desc" ? { price: ord } : {}

        const productos = await productModel.paginate(query, {
            limit: limite, 
            page: pagina, 
            sort,
            lean: true
        })
        console.log(productos)
        //res.status(200).send(productos)
        res.status(200).render('templates/home', { productos: productos.docs, js: 'productos.js', css: 'productos.css' })

    } catch (e) {
        res.status(500).send("Error en la consulta: ", e)
       
    }
}

export const getProduct = async (req, res) => {

    try {
        const idProducto = req.params.pid
        const producto = await productModel.findById(idProducto)
        
        if(producto)
            res.status(200).send(producto)
        else
            res.status(404).send("El producto no existe") 
        
    } catch (e) {
        res.status(500).send("Error en la consulta: ", e)
    }
}

export const postProduct = async (req, res) => {
    try {
        const producto = req.body
        const respuesta = await productModel.create(producto)
        res.status(201).send("Se ha creado el producto!")

    } catch (e) {
        res.status(500).send("Error en la creación del producto: ", e)
    }
}

export const putProduct = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const producto = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProducto, producto)
        res.status(200).send("Se ha actualizado el producto !")
    } catch (e) {
        res.status(500).send("Error al actualizar el producto: ", e)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const respuesta = await productModel.findByIdAndDelete(idProducto)
        res.status(200).send("Se ha eliminado el producto")

    } catch (e) {
        res.status(500).send("Error al eliminar el producto: ", e)
        
    }
}



