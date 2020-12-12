const express  = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

/*
  USAGE : Register a User
  URL : http://127.0.0.1:5000/users/register
  METHOD : POST
  FIELDS : name , email , password
 */
router.post('/register', async (request, response) => {
  try {
      let {name , email , password} = request.body;

      // user already exists with same email id
      let user = await User.findOne({email : email});
      if(user){
        return response.status(401).json({
          msg : 'Email already Exists'
        });
      }

      // encode the password
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password , salt);

      // get gravatar
      let image = gravatar.url(email, {
        s : '400',
        r : 'pg',
        d : 'mm'
      });

      // insert the record
      user = new User({name , email , password , image});
      user = await user.save(); // insert a user into  database
      response.status(200).json({
        result : 'Registration is Success',
        user : user
      });
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg : err.message
    });
  }
});

/*
  USAGE : Login a User
  URL : http://127.0.0.1:5000/users/login
  METHOD : POST
  FIELDS : email , password
 */
router.post('/login', async (request , response) => {
  try {
      let {email , password} = request.body;

      // check email is exists
      let user = await User.findOne({email : email});
      if(!user){
        return response.status(401).json({
          msg : 'Invalid Credentials'
        });
      }

      // match the password with db encoded password
      let isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch){
        return response.status(401).json({
          msg : 'Invalid Credentials'
        });
      }
      // generate a token
      let payload = {
        user : {
          id : user.id,
          name : user.name
        }
      };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 3600000}, (err , token) => {
        if(err) throw err;
        response.status(200).json({
          result : 'Login Success',
          token : token
        });
      });
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg : err.message
    });
  }
});

/*
  USAGE : Get User Info
  URL : http://127.0.0.1:5000/users/
  METHOD : GET
  FIELDS : no-fields
  TYPE : PRIVATE
 */
router.get('/', authenticate, async (request , response) => {
  try {
     let user = await User.findById(request.user.id).select('-password');
     response.status(200).json(user);
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg : err.message
    });
  }
});


module.exports = router;
