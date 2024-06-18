import Cart from '../model/CartModel.js';

const addToCart = async(req, res)=>{
    try{
        
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({success:false, message:'id is required' });
        }        

        const user = await Cart.findOne({userId:id});

        if (!user?._id) {
           const saved1 = await Cart.create({
                userId: id,
                products: {
                    productId: req.body.productId,
                    quantity: req.body.quantity
                }
            });

            console.log('saved1 : ',saved1)
        }

        const isProductExist = await Cart.findOne({
            userId: id,
            products: { $elemMatch: { productId: req.body.productId } }
        });

        if (!isProductExist) {
           const saved =  await Cart.updateOne({userId:id}, { $push: { products: {
                productId: req.body.productId,
                quantity: req.body.quantity
            } } });
            console.log('saved : ',saved)
        }

        const updatedCart = await Cart.updateOne({userId:id, 'products.productId': req.body.productId}, { $set: { 'products.$.quantity': req.body.quantity } });
        console.log('updatedCart : ',updatedCart)
        return res.status(200).send({ message: 'Cart updated successfully', watchlist: user.watchlist });
       
    }catch(err){
        return res.send(err)
    }
}


export {addToCart}