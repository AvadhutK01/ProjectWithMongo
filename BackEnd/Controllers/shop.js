const path = require('path');
const Product = require('../Models/product');
exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'shop', 'index.ejs'), {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
    }).catch(err => {
        console.log(err);
    });
};
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'shop', 'product-list.ejs'), {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        })
    }).catch(err => {
        console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
    let productId = req.params.productid;
    Product.findById(productId).then((product) => {
        res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'shop', 'product-detail.ejs'), { product: product, pageTitle: product.title, path: '/products' });
    }).catch(err => {
        console.log(err);
    });
}