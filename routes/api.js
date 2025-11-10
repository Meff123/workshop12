var express = require('express');
var router = express.Router();
var loginRouter = require('./login');
var registerRouter = require('./register');
var productRouter = require('./products');
var orderRouter = require('./orders');
var userRouter = require('./users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('asdsa');
});

router.use('/v1/login', loginRouter);
router.use('/v1/register', registerRouter);
router.use('/v1/products', productRouter);
router.use('/v1/orders', orderRouter);
router.use('/v1/users', userRouter);

module.exports = router;