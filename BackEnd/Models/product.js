const getDb = require("../util/database").getDb;
const mongodb = require('mongodb');
class Product {
    constructor(title, price, description, imageUrl, id) {
        this._id = new mongodb.ObjectId(id);
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
        } else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp.then((result) => {
            console.log(result);
        }).catch(err => {
            console.log(`Error: ${err}`);
        })
    }
    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(err => {
            console.error(err);
        });
    }
    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(product => {
            console.log(product);
            return product
        }).catch(err => {
            console.error(err);
        });
    }
    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(() => {
            return true;
        }).catch(err => {
            console.log(err);
        })
    }
}
module.exports = Product;