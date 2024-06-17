import User from '../model/User.js';
import UserInfo from '../model/UserInfo.js';

const Login =  async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      
      const user = await User.findOne({ email });
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
  };    

export {Login}