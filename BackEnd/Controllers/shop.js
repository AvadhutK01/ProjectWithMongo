const path = require('path');
const Product = require('../Models/product');
const Order = require('../Models/order');
exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
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
    Product.find().then(products => {
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
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product);
    }).then(result => {
        res.redirect('/cart')
        console.log(result);
    })
};
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        return req.user.deleteCartProduct(product);
    }).then(result => {
        res.redirect('/cart')
    })
};
exports.postOrder = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            const result = products.map(product => {
                return Product.findById(product._doc._id)
                    .then(productDetails => {
                        return {
                            product: { ...productDetails._doc },
                            quantity: product.quantity
                        };
                    })
                    .catch(err => console.log(err));
            });
            return Promise.all(result);
        })
        .then(products => {
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });

            return order.save();
        })
        .then(() => {
            return req.user.clearCart()
        }).then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'shop', 'orders.ejs'), {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders

            })
        })
}