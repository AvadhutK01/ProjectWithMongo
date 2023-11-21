const express = require('express');
const adminRoute = express.Router();
const adminController = require('../Controllers/admin')
adminRoute.get('/add-product', adminController.getProduct);
adminRoute.post('/add-product', adminController.AddProduct);
module.exports = adminRoute;