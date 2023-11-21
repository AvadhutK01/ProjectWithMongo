const express = require('express');
const shopRoute = express.Router();
const shopController = require('../Controllers/shop')
shopRoute.get('/', shopController.getIndex);
shopRoute.get('/products', shopController.getProducts);
shopRoute.get('/products/:productid', shopController.getProduct);
module.exports = shopRoute;