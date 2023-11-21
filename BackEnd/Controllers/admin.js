const Product = require("../Models/product");
const path = require('path');
// exports.getAddProduct = (req, res, next) => {
//     // console.log(path.join(__dirname, '..', 'Frontend', 'Views', 'admin', 'edit-product.ejs'));
//     res.render('admin/edit-product', {
//         pageTitle: 'Add Product',
//         path: path.join(__dirname, '..', 'Frontend', 'Views', 'admin', 'edit-product.ejs'),
//         editing: false
//     });
// };
module.exports.AddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl);
    product.save().then(result => {
        console.log("Product Created");
        res.redirect('/admin/products')
    }).catch(err => {
        console.log(err);
    })
}
module.exports.getProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: path.join(__dirname, '..', 'Frontend', 'Views', 'admin', 'edit-product.ejs'),
        editing: false
    });
}