import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_producto: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products' //Hace referencia a un id de la coleccion products
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    
})

cartSchema.pre('findOne', function(){
    this.populate('products.id_producto')
})

const cartModel = model("carts", cartSchema)
export default cartModel