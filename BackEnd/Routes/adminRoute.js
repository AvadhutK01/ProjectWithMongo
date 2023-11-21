const express = require('express');
const adminRoute = express.Router();
const adminController = require('../Controllers/admin')
adminRoute.get('/add-product', adminController.getAddProduct);
adminRoute.post('/add-product', adminController.postAddProduct);
adminRoute.get('/products', adminController.getProducts);
adminRoute.get('/edit-product/:productid', adminController.getEditProduct);
adminRoute.post('/edit-product', adminController.postEditProduct);
adminRoute.post('/delete-product', adminController.postDeleteProduct);
module.exports = adminRoute;