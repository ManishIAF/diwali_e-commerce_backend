require('dotenv').config({path:'./config/.env.config'})
const express = require('express')
const app = express()
const cors = require('cors')

const { initializeApp } = require('firebase/app');
const port = 3000
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const firebase = require('firebase/app')
const Bill = require('./model/Bill')
const UserInfo = require('./model/UserInfo')
const { v4: uuidv4 } = require('uuid');
const GirlModel = require('./model/Girl')
const MenModel = require('./model/Men')
const OtherModel = require('./model/Other')
const UserModel = require('./model/User')
const ContactModel = require('./model/Contect')
const Stripe = require('stripe')
const multer = require('multer')
const fs = require('fs');
const { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll,uploadBytes } =require('@firebase/storage');
const path = require('path')
const { body, validationResult } = require('express-validator');
const stripe = Stripe('sk_test_51PQkIBFHEvSwKEHycEWsKebEtR4sWNvEhHmCpaOyHckt0V7didH3cuWLsHR19hjkwsSuchf6mGI8eYvRILAaG2Fj00nDHpkVzu');
const watchlist = require('./route/watchlist')
const cart = require('./route/cart')

app.use(cors())
app.use(express.json());
app.use('/', watchlist)
app.use('/', cart )
require('./connect/Connect')
require('./connect/Imageconfig')


const upload = multer({storage : multer.memoryStorage()});
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

app.get('/',async(req,res)=>{
  
})


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


  app.post('/register', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], validate, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new UserModel({ name, email, password });
     const data =  await newUser.save();
    const new_info =  new UserInfo({
      name,
      userId: data._id,
      userRole: data.role
     })
     await  new_info.save()
      res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  app.post('/login', [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ], async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      console.log({ email, password });
      
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email credentials' });
      }
      
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password credentials' });
      }
    
      const userInfo = await UserInfo.findOne({ userId: user._id });
 console.log({userInfo });
    if (!userInfo) {
      return res.status(404).json({ error: 'User info not found' });
    }

   res.status(200).send( userInfo );
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

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
  
          res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
        }
      );
  
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
  
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  app.get('/girl',async (req,res)=>{
    try{
const data = await GirlModel.find()
res.send(data)
    }catch(err){
      res.send(err)
    }
  })
  app.post('/girl-data', async(req,res)=>{
    const { seller } = req.body;
console.log(seller)
    try {
        const data = await GirlModel.find({ seller : seller });

        if (data.length === 0) {
            return res.status(401).send("No data");
        }
console.log(data)
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
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
  
          res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
        }
      );
  
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
  
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.get('/men',async (req,res)=>{
    try{
const data = await MenModel.find()
res.send(data)
    }catch(err){
      res.send(err)
    }
  })
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
    res.status(500).send('Server Error');
  }
  });



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
  
          res.json({ message: 'Image uploaded and data saved successfully', data: newImage });
        }
      );
  
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
  
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/others',async (req,res)=>{
  try{
const data = await OtherModel.find()
res.send(data)
res.send(data)
  }catch(err){
    res.send(err)
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
    res.status(500).send('Server Error');
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
      res.status(500).send({ message: 'Internal server error' });
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
  
      res.status(200).send(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
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
      res.status(500).send({ message: 'Internal server error' });
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

   
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})
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

   
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})
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
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})