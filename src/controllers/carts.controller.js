import cartModel from "../models/cart.model.js"

export const getCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const carrito = await cartModel.findOne({_id: idCarrito}).populate('products.id_producto').lean();
        if(carrito) {
            console.log(carrito.products)
            //res.status(200).send(carrito.products)
            res.status(200).render('templates/cart', { productos: carrito.products, js: 'productos.js', css: 'productos.css'})
        } else {
            res.status(404).send({mensaje: "El carrito no existe"})
        }

    } catch (e) {
        res.status(500).send("Error en la consulta: ", e)
    }
}

//POST
export const postCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create({products: []})
        res.status(201).send("Se ha creado el carrito!")

    } catch (e) {
        res.status(500).send("Error en la creación del carrito: ", e)
    }
}

export const addProdCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const {quantity} = req.body
        const carrito = await cartModel.findById(idCarrito)
        if (carrito) {
            const indProducto = carrito.products.findIndex(prod => prod.id_producto._id == idProducto)
            if (indProducto != -1) {
                carrito.products[indProducto].quantity += quantity 
        
            }else{
                carrito.products.push({id_producto: idProducto, quantity: quantity})
            }    
            const respuesta = await cartModel.findByIdAndUpdate(idCarrito, carrito)
            return res.status(200).send(respuesta)
        
        }else{
            res.status(404).send("El carrito no existe")    
        }

    } catch (e) {
        res.status(500).send("Error al actualizar el carrito: ", e)
    }
}

// PUT
export const updateProdsCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const { newProd } = req.body 

        const carrito = await cartModel.findOne({_id: idCarrito}) 
        
        carrito.products = newProd
        carrito.save() 
        res.status(200).send(carrito)
        
    } catch (e) {
        res.status(500).send("Error en la actualización del carrito: ", e)
    }
}

export const updateQtyCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const {quantity} = req.body
        const carrito = await cartModel.findOne({_id: idCarrito}) 
        const indProducto = carrito.products.findIndex(prod => prod.id_producto._id == idProducto)
        console.log(indProducto)

        if (indProducto != -1) {
            carrito.products[indProducto].quantity = quantity
            carrito.save()
            res.status(200).send("Actualizado")
    
        }else{
            res.status(404).send("El producto no existe en el carrito") 
        }    
        

    } catch (e) {
        res.status(500).send("Error en la creación del carrito: ", e)
    }
}

//DELETE
export const deleteProdCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const carrito = await cartModel.findOne({_id: idCarrito}) 
        const indProducto = carrito.products.findIndex(prod => prod.id_producto._id == idProducto)

        if (indProducto != -1) {
            carrito.products.splice(indProducto,1)
            carrito.save() 
            res.status(200).send(carrito)
    
        }else{
            res.status(404).send("El producto no existe en el carrito") 
        }    
        
    } catch (e) {
        res.status(500).send("Error en la creación del carrito: ", e)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const carrito = await cartModel.findOne({_id: idCarrito}) 
        if (carrito) {
        carrito.products = []
        carrito.save()
        res.status(200).send(carrito)
        }else{
            res.status(404).send("El carrito no existe")    
        }

    } catch (e) {
        res.status(500).send("Error en la eliminación del carrito: ", e)
    }
}



