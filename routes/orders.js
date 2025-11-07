var express = require('express');
var router = express.Router();
var Order = require('../models/order.model');
const verifyToken = require('../middleware/jwt_decode');
const checkAccess = require('../middleware/check_access');

router.use(verifyToken);
router.use(checkAccess);
/* GET users listing. */
router.get('/',async function(req, res, next) {
  let orders = await Order.find()
  return res.status(200).json({
    status: 200,
    message: "success",
    data:orders
  })
});

module.exports = router;
