import productModel from "../models/product.js";


export const getProducts = async (req, res) => {
    try {
        const { limit, page, filterMethod, filter, ord } = req.query

        const pagina = page || 1
        const limite = limit || 10
        const query = filterMethod && filter ? {[filterMethod]: filter} : {}
        const sort = ord === "asc" || ord === "desc" ? { price: ord } : {}

        const prods = await productModel.paginate(query, {
            limit: limite, 
            page: pagina, 
            sort,
            lean: true
        })

        prods.pageNumbers = Array.from({length: prods.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === prods.page
        }))

        //console.log(prods)
        res.status(200).render('templates/home', { productos: prods.docs, prods: prods,  css: 'products.css' })

    } catch (e) {
        res.status(500).send("Error en la consulta: ", e)
       
    }
}

export const getProduct = async (req, res) => {

    try {
        const idProducto = req.params.pid
        const product = await productModel.findById(idProducto).lean()
        
        if(product){
            console.log("Producto encontrado:", product)
            res.status(200).render('templates/product', { producto: product, css: 'products.css' })
        }else{
            res.status(404).send("El producto no existe") 
        }
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
        res.status(500).send("Error en la creación del producto: ")
    }
}

export const updateProduct = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const producto = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProducto, producto)
        res.status(200).redirect('templates/home', {respuesta})
    } catch (e) {
        res.status(500).send("Error al actualizar el producto: ", e)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const respuesta = await productModel.findByIdAndDelete(idProducto)
        res.status(200).redirect('templates/home', {respuesta})

    } catch (e) {
        res.status(500).send("Error al eliminar el producto: ", e)
        
    }
}
