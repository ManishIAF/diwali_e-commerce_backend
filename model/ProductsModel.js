import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [{
        type: String
    }],
    categoryIds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }],
    attributes: {
      color: String,
      size: String
    },
    stockQuantity: Number,
  },{
    timestamps: true
  });


const Products = mongoose.model('Product', Schema);

export default Products;