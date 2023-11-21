const Product = require("../Models/product");
const path = require('path');
module.exports.postAddProduct = (req, res) => {
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
module.exports.getAddProduct = (req, res) => {
    res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'admin', 'edit-product.ejs'), {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(
        (rows) => {
            res.render(path.join(__dirname, '..', '..', 'Frontend', 'Views', 'admin', 'products.ejs'), {
                prods: rows,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        }
    ).catch(err => {
        console.log(err);
    })
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productid;
    Product.findById(prodId).then((product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }).catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedprice = req.body.price;
    const updatedimageUrl = req.body.imageUrl;
    const updateddescription = req.body.description;
    const product = new Product(updatedtitle, updatedprice, updateddescription, updatedimageUrl, prodId);
    product.save().then(() => { res.redirect('/admin/products') }).catch(err => {
        console.log(err);
    })

};
exports.postDeleteProduct = (req, res, next) => {
    const DeleteId = req.body.deleteId;
    Product.deleteById(DeleteId).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    })
}