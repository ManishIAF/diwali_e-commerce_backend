import Cart from '../model/CartModel.js';

const getCart = async(req, res)=> {
    try {
        const { userId } = req.user;
        console.log('user id : ',userId)
        const caetData = await Cart.findOne({userId}).populate('products.productId');
        if (!caetData) {
          return res.status(404).json({ error: 'User not found' });
        }
        console.log('caetData : ',caetData)
        return res.json(caetData);
      } catch (err) {
        console.error('Error fetching cart data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const addToCart = async(req, res)=>{
    try{
        const { id } = req.query;
        const {userId} = req.user;

        if (!id) {
            return res.status(400).json({success:false, message:'id is required' });
        }

        const cart = await Cart.findOne({userId});
        console.log('user : ',cart)

        if (!cart?._id) {
            const saved = await Cart.create({
                 userId,
                 products: {
                     productId: id,
                     // quantity: req.body.quantity
                 }
             });
         }

        const foundProductInCart = await cart.products.find(product => product.productId.toString() === id);

        if (foundProductInCart) {
            return res.status(400).json({success:false, message:'Product already exists in cart' });
        }

        // const isProductExist = await Cart.findOne({
        //     userId: id,
        //     products: { $elemMatch: { productId: req.body.productId } }
        // });

        // if (!isProductExist) {
           if(cart?._id){
               const saved =  await Cart.updateOne({userId}, { $push: { products: {
                   productId: id,
                   // quantity: req.body.quantity
               } } });
           }
        // }

        // const updatedCart = await Cart.updateOne({userId:id, 'products.productId': req.body.productId}, { $set: { 'products.$.quantity': req.body.quantity } });
        return res.status(200).send({ message: 'Cart updated successfully', watchlist: user.watchlist });
       
    }catch(err){
        return res.send(err)
    }
}

const removeFromCart = async(req, res)=>{
    try{

        const { userId } = req.user;
        const { productId } = req.query;
        console.log('req.query : ',req.query)
        console.log('req params : ',req.params)
        console.log('id : ',productId)
        console.log('userId : ',userId)

        if (!productId) {
            return res.status(400).json({ success:false,message:'Product ID are required' });
        }

        //find product by userId and product _id in cart and delete

        const deletedProduct = await Cart.findOneAndUpdate({ userId }, { $pull: { products: { _id: productId } } }, { new: true });
        console.log('deletedProduct : ',deletedProduct)
        res.status(200).json({success:true,message: 'cart updated successfully'});
    }catch(err){
        res.status(500).send({ error: err.message });
    }
}


export {addToCart,getCart,removeFromCart}