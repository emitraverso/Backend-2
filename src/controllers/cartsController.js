import cartModel from "../models/cart.js";
import ticketModel from "../models/ticket.js";
import productModel from "../models/product.js";

export const getCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const carrito = await cartModel.findOne({_id: idCarrito})
        if (carrito) {
            console.log(carrito.products)
            res.status(200).send(carrito)
        } else {
            res.status(404).send({ mensaje: "El carrito no existe" })
        }

    } catch (e) {
        res.status(500).send({ error: "Error en la consulta", details: e.message })
    }
}

//POST
export const postCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create({ products: [] })
        res.status(201).send("Se ha creado el carrito!")

    } catch (e) {
        res.status(500).send({ error: "Error al crear el carrito", details: e.message })
    }
}

export const addProdCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const { quantity } = req.body
        const carrito = await cartModel.findOne({_id: idCarrito})
        if (carrito) {
            const indice = carrito.products.findIndex(prod => prod._id == idProducto)
            if (indice != -1) {
                carrito.products[indice].quantity = quantity

            } else {
                carrito.products.push({ id_prod: idProducto, quantity: quantity })
            }
            const respuesta = await cartModel.findByIdAndUpdate(idCarrito, carrito)
            return res.status(200).send(respuesta)

        } else {
            res.status(404).send("El carrito no existe")
        }

    } catch (e) {
        res.status(500).send({ error: "Error al actualizar el carrito", details: e.message })
    }
}

// PUT
export const updateProdsCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const { newProd } = req.body

        const carrito = await cartModel.findOne({ _id: idCarrito })

        carrito.products = newProd
        carrito.save()
        res.status(200).send(carrito)

    } catch (e) {
        res.status(500).send({ error: "Error al actualizar el carrito", details: e.message })
    }
}

export const updateQtyCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const { quantity } = req.body
        const carrito = await cartModel.findOne({ _id: idCarrito })
        const indProducto = carrito.products.findIndex(prod => prod.id_producto._id == idProducto)
        console.log(indProducto)

        if (indProducto != -1) {
            carrito.products[indProducto].quantity = quantity
            carrito.save()
            res.status(200).send("Actualizado")

        } else {
            res.status(404).send("El producto no existe en el carrito")
        }


    } catch (e) {
        res.status(500).send("Error en la creación del carrito ")
    }
}

//DELETE
export const deleteProdCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const idProducto = req.params.pid
        const carrito = await cartModel.findOne({_id: idCarrito})
        const indProducto = cart.products.findIndex(prod => prod._id == idProducto)

        if (indProducto != -1) {
            carrito.products.splice(indProducto, 1)
            carrito.save()
            res.status(200).send(carrito)

        } else {
            res.status(404).send("El producto no existe en el carrito")
        }

    } catch (e) {
        res.status(500).send({ error: "Error al actualizar el carrito", details: e.message })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const carrito = await cartModel.findOne({ _id: idCarrito })
        if (carrito) {
            carrito.products = []
            carrito.save()
            res.status(200).send(carrito)
        } else {
            res.status(404).send("El carrito no existe")
        }

    } catch (e) {
        res.status(500).send({ error: "Error al eliminar el carrito", details: e.message })
    }
}


//PURCHASE

export const checkout = async(req,res) => {
    try {
        const cartId = req.params.cid
        const carrito = await cartModel.findById(cartId)
        const prodSinStock = []
        
        if(carrito) {
            
            for(const prod of carrito.products) {
                let producto = await productModel.findById(prod.id_prod)
                if(producto.stock - prod.quantity < 0) {
                    prodSinStock.push(producto.id)
                }
            }

            if(prodSinStock.length === 0) {
                let totalAmount = 0;
    
                for (const prod of carrito.products) { 
                    const producto = await productModel.findById(prod.id_prod);
                    if (producto) {
                        producto.stock -= prod.quantity;
                        totalAmount += producto.price * prod.quantity;
                        await producto.save();
                    }
                }
            
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalAmount,
                    products: carrito.products
                });

                await cartModel.findByIdAndUpdate(cartId, { products: []})
                res.status(200).send(newTicket)
            } else {
                
                prodStockNull.forEach((prodId) => {
                    let indice = carrito.products.findIndex(prod => prod.id == prodId)
                    carrito.products.splice(indice,1)
                    
                })
                await cartModel.findByIdAndUpdate(cartId, {
                    products: carrito.products
                })
                res.status(400).send(prodSinStock)
            }
        } else {
            res.status(404).send({message: "Carrito no existe"})
        }
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}