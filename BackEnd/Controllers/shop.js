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
exports.getCart = (req, res, next) => {
    req.user.getCart().then(products => {
        res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'shop', 'cart.ejs'), {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products

        })
    })
};
exports.postCart = (req, res, next) => {
    const prodId = req.body.productid;
    const user = req.user;
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product, user);
    }).then(result => {
        res.redirect('/cart')
        console.log(result);
    })
};
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const user = req.user;
    Product.findById(prodId).then(product => {
        return req.user.deleteCartProduct(product, user);
    }).then(result => {
        res.redirect('/cart')
        console.log(result);
    })
};