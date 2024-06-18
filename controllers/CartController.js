import Cart from '../model/CartModel.js';

const addToCart = async(req, res)=>{
    try{
        
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({success:false, message:'id is required' });
        }        

        const user = await Cart.findOne({userId:id});

        const findProduct = await user.products.find(product => product.productId === req.body.productId);

        if (findProduct) {
            return res.status(400).json({success:false, message:'Product already exists in cart' });
        }

        if (!user?._id) {
           const saved = await Cart.create({
                userId: id,
                products: {
                    productId: req.body.productId,
                    quantity: req.body.quantity
                }
            });

            console.log('saved1 : ',saved)
        }

        // const isProductExist = await Cart.findOne({
        //     userId: id,
        //     products: { $elemMatch: { productId: req.body.productId } }
        // });

        // if (!isProductExist) {
           if(user?._id){
               const saved =  await Cart.updateOne({userId:id}, { $push: { products: {
                   productId: req.body.productId,
                   // quantity: req.body.quantity
               } } });
               console.log('saved : ',saved)
           }
        // }

        const updatedCart = await Cart.updateOne({userId:id, 'products.productId': req.body.productId}, { $set: { 'products.$.quantity': req.body.quantity } });
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