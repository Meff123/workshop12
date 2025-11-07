var express = require('express');
var router = express.Router();

var User = require("../models/user.model");
const verifyToken = require("../middleware/jwt_decode");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resourcesss');
});

router.put('/:id/approve', verifyToken, async function (req, res, next) {
  if (!req.userData || req.userData.userRole !== 'admin') {
    return res.status(401).json({ status: "400", message: "Access denied. Administrator privileges required." ,data:null})
  };
  let { id } = req.params
  try {
    let access = true;
    let user = await User.findByIdAndUpdate(id,{access},{new: true});
    return res.status(201).json({ status: 201,message: "Update" , data: user});
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:500, "message":error.message,"data":null});
  }
})

module.exports = router;
