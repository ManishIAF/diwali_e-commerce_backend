import User from '../model/User.js';

const Register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password)
      const newUser = new User({ name, email, password });

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
  
  };

  export {Register}