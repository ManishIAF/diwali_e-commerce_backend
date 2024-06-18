import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    products: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            min:0
        }
    }]
}, 
{
    timestamps: true

});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
