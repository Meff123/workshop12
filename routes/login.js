var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var userSchema = require('../models/user.model');
var bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async function (req, res, next) {
  const { username, password } = req.body
  try{
    const user = await userSchema.findOne({username: username});
    console.log(user);
    if(!user){
      return res.status(400).json({ status: 400,message: 'Not found user!!!', data: null });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ status: 400,message: 'Password incorrect', data: null});
    }
    const payload = {
             userId: user._id,
             username: user.username,
             role: user.role,
             access: user.access
        };

    const token = jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h'}
    );
    console.log(token);
    const userId = user._id;
    return res.json({ 
            status: 200,
            message: 'ล็อกอินสำเร็จ',
            userId: userId,
            token: token // ส่ง token กลับไปด้วย
        });
  }catch(error){
    return res.status(500).json({status:500, message:error.message,data:null})
  }   
});

module.exports = router;