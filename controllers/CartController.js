import Cart from '../model/CartModel.js';

const getCart = async(req, res)=> {
    try {
        const { userId } = req.user;
        const caetData = await Cart.findOne({userId}).populate('products.productId');

        if (!caetData) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json(caetData);
      } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const addToCart = async(req, res)=>{
    try{
        const { id } = req.query;
        const {userId} = req.user;
        console.log('id : ',id)
        console.log('req query : ',req.query)
        if (!id) {
            return res.status(400).json({success:false, message:'id is required' });
        }

        const cart = await Cart.findOne({userId});
        console.log('cart : ',cart)
        if (!cart?._id) {
            const ggg = await Cart.create({
                 userId,
                 products: {
                     productId: id,
                     // quantity: req.body.quantity
                 }
             });

                console.log('ggg : ',ggg)
         }

        const foundProductInCart = await cart.products.find(product => product.productId.toString() === id);
         console.lof('foundProductInCart : ',foundProductInCart)
        if (foundProductInCart) {
            return res.status(400).json({success:false, message:'Product already exists in cart' });
        }

        if(cart?._id){
            await Cart.updateOne({userId}, { $push: { products: {
                productId: id,
            } } });
        }

        return res.status(200).json({ message: 'Cart updated successfully',success:true });
       
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

const removeFromCart = async(req, res)=>{
    try{

        const { userId } = req.user;
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ success:false,message:'Product ID are required' });
        }

        const deletedProduct = await Cart.findOneAndUpdate({ userId }, { $pull: { products: { productId: productId } } }, { new: true });

        console.log('deletedProduct : ',deletedProduct)

        res.status(200).json({success:true,message: 'cart deleted successfully'});

    }catch(err){
        console.log('err : ',err)
        res.status(500).send({ error: err.message });
    }
}


export {addToCart,getCart,removeFromCart}