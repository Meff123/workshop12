var express = require('express');
var router = express.Router();

var userSchema = require('../models/user.model');
var bcrypt = require('bcrypt');

router.post('/', async function (req, res, next) {
  try{
    let { username, email, password } = req.body
    const checkuser = await userSchema.findOne({ username: username });
    if(checkuser){ 
             return res.status(400).json({status:400, message:"This user already exists.", data: null})
        }
    let role = 'user'
    let access = false
    let user = new userSchema({
      username: username,
      email: email,
      role: role,
      access: access,
      password: await bcrypt.hash(password, 10),
      
    })
    await user.save()
    return res.status(201).json({"status":201, "message":"create success","data":user})
  }catch(error){
    return res.status(500).json({"status":500, "message":error.message,"data":null})
  }   
});

module.exports = router;