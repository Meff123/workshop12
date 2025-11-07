var express = require('express');
var router = express.Router();

var Product = require('../models/product.model');
var Order = require('../models/order.model');
const verifyToken = require('../middleware/jwt_decode');
const checkAccess = require('../middleware/check_access');

router.use(verifyToken);
router.use(checkAccess);

router.get('/', async function (req, res, next) {
    try {
        const product = await Product.find();
        console.log(product)
        return res.json({
            status: 200,
            message: 'success',
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.post('/', async function (req, res, next) {
    try {
        let { name, stock } = req.body
        const checkproduct = await Product.findOne({ name: name });
        if (checkproduct) {
            return res.status(400).json({ status: 400, message: "This product already exists.", data: null })
        }
        let product = new Product({
            name: name,
            stock: stock
        })
        await product.save()
        return res.status(201).json({
            status: 201,
            message: 'Product created successfully',
            product: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let { name, stock } = req.body
        let { id } = req.params

        let product = await Product.findByIdAndUpdate(id, { name, stock }, { new: true })
        return res.status(201).json({
            status: 201,
            message: 'Product update successfully',
            product: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        let { id } = req.params

        let product = await Product.findByIdAndDelete(id)
        return res.status(200).json({
            status: 200,
            message: 'Product delete successfully',
            product: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params

        let product = await Product.findById(id)
        return res.status(200).json({
            status: 200,
            message: 'Show Product',
            product: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.post('/:id/orders', async function (req, res, next) {
    try {
        let { id } = req.params
        let { quantity } = req.body
        let product = await Product.findById(id)
        let name = product.name;
        if (quantity <= product.stock) {
            let order = new Order({
                productId: id,
                name: name,
                quantity: quantity
            })
            await order.save()
            let stock = product.stock - quantity;
            product = await Product.findByIdAndUpdate(id, { name, stock }, { new: true })
            return res.status(201).json({
                status: 201,
                message: 'Order created successfully',
                data: order
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: 'Order failed to create',
                data: null
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
})

router.get('/:id/orders', async function (req, res, next) {
    try {
        let { id } = req.params
        let order = await Order.find({ productId: id });
        return res.status(200).json({
            status: 200,
            message: 'Show the order of this product',
            data: order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message, data: null });
    }
})
module.exports = router;