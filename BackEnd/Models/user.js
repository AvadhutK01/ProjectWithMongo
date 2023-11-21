const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const Product = require('./product');
class UserDb {
    constructor(name, email, cart, id) {
        this._id = id
        this.name = name
        this.email = email
        this.cart = cart
    }
    save() {
        const db = getDb();
        return db.collection('user').insertOne(this).then(result => {
            // console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    addToCart(product, user) {
        const result = user.cart.items.find((item) => item.productId.equals(new mongodb.ObjectId(product._id)));
        const quantity = parseInt(result ? result.quantity : 0);
        const CartItemsFromUser = [...this.cart.items]
        if (quantity > 0) {
            const index = CartItemsFromUser.indexOf(result)
            CartItemsFromUser[index].quantity = quantity + 1;
        }
        else {
            CartItemsFromUser.push({ productId: new mongodb.ObjectId(product._id), quantity: quantity + 1 })
        }
        const updatedCart = {
            items: CartItemsFromUser
        };
        const db = getDb();
        return db.collection('user').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })
    }
    static findUserById(userID) {
        const db = getDb();
        return db.collection('user').find({ _id: new mongodb.ObjectId(userID) }).next().then(result => {
            return result;
        }).catch(err => {
            console.log(err);
        })
    }
}
module.exports = UserDb;