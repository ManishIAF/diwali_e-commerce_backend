import Cart from '../model/CartModel.js';

const addToCart = async(req, res)=>{
    try{
        
        const { id } = req.query;
        const {_id:userId} = req.user;
        console.log('id : ',id)
        console.log('userId : ',userId)

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
 
             console.log('saved1 : ',saved)
         }

        const foundProductInCart = await cart.products.find(product => product.productId === id);

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
               console.log('saved : ',saved)
           }
        // }

        // const updatedCart = await Cart.updateOne({userId:id, 'products.productId': req.body.productId}, { $set: { 'products.$.quantity': req.body.quantity } });
        console.log('updatedCart : ',updatedCart)
        return res.status(200).send({ message: 'Cart updated successfully', watchlist: user.watchlist });
       
    }catch(err){
        return res.send(err)
    }
}

const removeFromCart = async(req, res)=>{
    try{
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).send({ error: 'User ID and Product ID are required' });
        }

        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!user.cart) {
            user.cart = [];
        }

        user.cart = user.cart.filter(item => item._id.toString() !== productId);

        await user.save();

        res.status(200).send({ message: 'cart updated successfully', cart: user.cart });
    }catch(err){
        res.status(500).send({ error: err.message });
    }
}


export {addToCart}