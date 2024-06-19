import {config} from 'dotenv'
config({ path:'./config/.env.config'});
import express from 'express'
import cors from 'cors'


import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'
import Stripe from 'stripe'
import multer from 'multer'
import path from 'path'
import { body, validationResult } from 'express-validator';
import morgan from 'morgan';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//------------------------------------------unused imports------------------------------------------------
// const fs = require('fs');
// const firebase = require('firebase/app')
// const { v4: uuidv4 } = require('uuid');
// const { initializeApp } = require('firebase/app');
// const { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll,uploadBytes } =require('@firebase/storage');
//---------------------------------------------------------------------------------------------------------
const app = express()


import connectDB from './connect/Connect.js'
import './connect/Imageconfig.js'

app.use(cors({
  origin:['https://diwali-e-commerce-backend-n2a2.onrender.com','http://localhost:3000'],
  credentials:true,
  methods:['GET','POST','PUT','DELETE']

}))
app.use(express.json());
app.use(morgan('dev'));

//-------------------------------------------Multer Config--------------------------------------------------
const upload = multer({storage : multer.memoryStorage()});
//---------------------------------------------------------------------------------------------------------

//-------------------------------------------importing Routes----------------------------------------------

// import registerRoute from './routes/registerRoute.js'
// import loginRoute from './routes/loginRoute.js'
import wishListRoute from './routes/watchlist.js'
import cartRoute from './routes/cartRoute.js'
import clothingRouter from './routes/clothingRoute.js'
import { ErrorMiddleware } from './middleware/ErrorMiddleware.js';
//---------------------------------------------------------------------------------------------------------

//-------------------------------------------Using Routes--------------------------------------------------
app.use('/cart', cartRoute )
app.use('/wishlist', wishListRoute)
// app.use('/register', registerRoute )
// app.use('/login', loginRoute )
app.use('/clothing', clothingRouter)

//---------------------------------------------------------------------------------------------------------


//-------------------------------------------Models--------------------------------------------------------

import Bill from './model/Bill.js'
import GirlModel from './model/Girl.js'
import MenModel from './model/Men.js'
import OtherModel from './model/Other.js'
import ContactModel from './model/Contect.js';
import Category from './model/CategoryModel.js';
import Products from './model/ProductsModel.js';
// import Men_EthinicWear from './constantData/Men/EthinicMenWear.js';
// import sherwaniData from './constantData/Men/Sherwani.js';
// import ethnicPajamaData from './constantData/Men/Pajama.js';

// import sareeData from './constantData/Women/Saree.js';
// import kurtaKurtiData from './constantData/Women/Kurta&Kurtis.js';
import lehengaCholiData from './constantData/Women/Legnga&Choli.js';
//---------------------------------------------------------------------------------------------------------

app.get('/',async(req,res)=>{
  // const products = await Products.find({}).populate('categoryIds');
  return res.status(200).send(ethnicPajamaData);
})
app.post('/',async(req,res)=>{
  try {
    const category = await Category.create({
      name: "Kids",
    });
    return res.status(200).send(category);
  } catch (error) {
    console.error('Error creating category:', error);
  }
})

app.post('/product', async (req, res) => {

  try {
    const category = await Category.find({ name: {$in:['Clothing','Ethnic','Women',"Girl",'Lehnga Choli']} });
    
    // Men Cotton Blend Kurta Pyjama Set
    lehengaCholiData.forEach(async(product)=>{
    //replace image 128/128 with 1080/1080 for better quality
    const newImage = product.images.map((image)=>image.replace('128/128','1080/1080'))
    await Products.create({
      name:product.name,
      description:product.description,
      price:product.price,
      images:newImage,
      categoryIds:category.map((cat)=>cat._id),
      attributes:product.attributes,
      stockQuantity:product.stockQuantity,
    })
  }
)

console.log('Data length : ',lehengaCholiData.length)
    // const products = await Products.find({});   
    return res.status(200).send(lehengaCholiData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Server Error');
  }
});


app.post('/bills', [
  body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('zip').isNumeric().withMessage('Zip code must be a number'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits and numeric'),
    body('email').isEmail().withMessage('Email must be valid')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, country, address, city, state, zip, phone, email, total } = req.body;

  try {
      const newBill = new Bill({ firstName, lastName, country, address, city, state, zip, phone, email });
      await newBill.save();
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: 'usd',
        payment_method_types: ['card'],
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
      res.status(500).json({ message: 'Error creating bill', error: error.message });
  }
});

app.put('/update', async (req, res) => {
  const { seller, id } = req.body;

  try {
    const data = await GirlModel.findById(id);

    if (!data) {
      return res.status(404).send({ error: 'User not found' });
    }
if(!data.seller){
  data.seller = seller;

    await data.save();

    res.send(data);
}
   
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/contact', async(req,res)=>{
  const {name, email, phone, message} = req.body
  try{
const data = new ContactModel({name, email, phone, message})
const respon = await data.save()
res.send(respon)
  }catch(err){
      res.send(err)
  }
})


app.get('/girl',async (req,res)=>{
  try{
const data = await GirlModel.find()
return res.send(data)
  }catch(err){
    return res.send(err)
  }
})
app.post('/girl', upload.single('image'), async (req, res) => {
  try {
    console.log('Request received:', req.body);

    const { title, price, q, seller } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      console.log('No image uploaded.');
      return res.status(400).send('No image uploaded.');
    }

    console.log('Image file:', imageFile);

    console.log('Uploading to Cloudinary...');

    // Upload the image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'your_folder_name' },
      async (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ error: 'Failed to upload image' });
        }

        console.log('Image uploaded to Cloudinary:', result);

        // Store the image URL and other data in MongoDB
        const newImage = new GirlModel({
          title,
          price,
          image: result.secure_url,
          q,
          seller
        });

        await newImage.save();

        return res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
      }
    );

    // streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
});
app.put('/girl', async (req, res) => {
  try {
    const { id, price, q } = req.body;

    
    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    
    const updatedProduct = await GirlModel.findByIdAndUpdate(
      id,
      { price, q },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    return res.status(200).send(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
});
app.delete('/girl', async(req, res)=>{
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

   
    const deletedProduct = await GirlModel.findByIdAndDelete(id);

    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})

app.get('/men',async (req,res)=>{
  try{
const data = await MenModel.find()
return res.send(data)
  }catch(err){
    return res.send(err)
  }
})
app.post('/men', upload.single('image'), async (req, res) => {
  try {
    console.log('Request received:', req.body);

    const { title, price, q, seller} = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      console.log('No image uploaded.');
      return res.status(400).send('No image uploaded.');
    }

    console.log('Image file:', imageFile);

    console.log('Uploading to Cloudinary...');

    // Upload the image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'your_folder_name' },
      async (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).json({ error: 'Failed to upload image' });
        }

        console.log('Image uploaded to Cloudinary:', result);

        // Store the image URL and other data in MongoDB
        const newImage = new MenModel({
          title,
          price,
          image: result.secure_url,
          q,
          seller
        });

        await newImage.save();

        return res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
      }
    );

    streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.put('/men', async (req, res) => {
  try {
    const { id, price, q } = req.body;

    
    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    
    const updatedProduct = await MenModel.findByIdAndUpdate(
      id,
      { price, q },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
});
app.delete('/men', async(req, res)=>{
  try {
    const { id } = req.body;
if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

   
    const deletedProduct = await MenModel.findByIdAndDelete(id);

    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

   
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})


app.get('/others',async (req,res)=>{
  try{
const data = await OtherModel.find()
return res.send(data)
  }catch(err){
    return res.send(err)
  }
})
app.post('/others', upload.single('image'), async (req, res) => {
    try {
      console.log('Request received:', req.body);
  
      const { title, price, q, seller } = req.body;
      const imageFile = req.file;
  
      if (!imageFile) {
        console.log('No image uploaded.');
        return res.status(400).send('No image uploaded.');
      }
  
      console.log('Image file:', imageFile);
  
      console.log('Uploading to Cloudinary...');
  
      // Upload the image to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'your_folder_name' },
        async (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).json({ error: 'Failed to upload image' });
          }
  
          console.log('Image uploaded to Cloudinary:', result);
  
          // Store the image URL and other data in MongoDB
          const newImage = new OtherModel({
            title,
            price,
            image: result.secure_url,
            q,
            seller
          });
  
          await newImage.save();
  
          return res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
        }
      );
  
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
  
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
app.put('/others', async (req, res) => {
  try {
    const { id, price, q } = req.body;

    
    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    
    const updatedProduct = await OtherModel.findByIdAndUpdate(
      id,
      { price, q },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
});
app.delete('/other', async(req, res)=>{
  try {
    const { id } = req.body;
if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

   
    const deletedProduct = await OtherModel.findByIdAndDelete(id);

    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

   
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})

app.post('/others-data', async (req, res) => {
  const {seller} = req.body
  try {
    const girlsData = await OtherModel.find({ seller });

    if (girlsData.length === 0) {
      return res.status(404).send({ error: 'No data found for this seller' });
    }

    res.send(girlsData);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
});

app.post('/men-data', async (req, res) => {
  const { seller } = req.body;

try {
  const menData = await MenModel.find({ seller });

  if (!menData || menData.length === 0) {
    return res.status(404).json({ error: 'No data found for this seller' });
  }

  res.json(menData);
} catch (err) {
  console.error('Error fetching data:', err);
  return res.status(500).send('Server Error');
}
});

app.post('/girl-data', async(req,res)=>{
  const { seller } = req.body;
console.log(seller)
  try {
      const data = await GirlModel.find({ seller : seller });

      if (data.length === 0) {
          return res.status(401).send("No data");
      }
console.log(data)
return res.send(data);
  } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
  }
})


const getImageData = async (imagePath) => {
  try {
    const imagePathAbs = path.join(__dirname, imagePath); 
    return imagePathAbs;
  } catch (error) {
    console.error('Error reading image file:', error);
    return null;
  }
};

app.use(ErrorMiddleware)
const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
  await connectDB();
  console.log(`Example app listening on port ${PORT}`)
})