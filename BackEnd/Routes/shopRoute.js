const express = require('express');
const shopRoute = express.Router();
const shopController = require('../Controllers/shop')
shopRoute.get('/', shopController.getIndex);
shopRoute.get('/products', shopController.getProducts);
shopRoute.get('/products/:productid', shopController.getProduct);
shopRoute.get('/cart', shopController.getCart);
shopRoute.post('/cart', shopController.postCart);
shopRoute.post('/cart-delete-item', shopController.postCartDeleteProduct);
module.exports = shopRoute;