import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    totalAmount: {
        type:Number,
        required:true
    },
    totalItems: {
        type:Number,
        required:true
    },
    purchesedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    }],
    recepientDetails:{
        name:String,
        email:String,
        phone:Number,
        address:String,
        city:String,
        state:String,
        country:String,
        postalCode:Number
    },
    orderStatus:{
        type:String,
        enum:["pending","completed","cancelled","shipped","delivered","returned"],
        default:"pending"
    },
    paymentStatus:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    },
    paymentType:{
        type:String,
        enum:["card","cash","upi"],
        default:"card"
    },
    paymentId:String,
    paymentToken:String,
    paymentGateway:String,
    paymentTime:Date,
    orderTime:Date,
    deliveryTime:Date,

})


const Order = mongoose.model("orderDetails", orderSchema)

export default Order;