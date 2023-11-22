const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('../Models/product');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }
});
userSchema.methods.getCart = function () {
    const productIds = this.cart.items.map(i => {
        return i.productId;
    })
    return product.find({ _id: { $in: productIds } }).then(product => {
        return product.map(p => {
            return {
                ...p, quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                }).quantity
            }
        })
    });
}
userSchema.methods.addToCart = function (product) {
    const result = this.cart.items.find((item) => item.productId.toString() === product._id.toString());
    const quantity = parseInt(result ? result.quantity : 0);
    const CartItemsFromUser = [...this.cart.items]
    if (quantity > 0) {
        const index = CartItemsFromUser.indexOf(result)
        CartItemsFromUser[index].quantity = quantity + 1;
    }
    else {
        CartItemsFromUser.push({
            productId: product._id,
            quantity: quantity + 1
        });
    }
    const updatedCart = {
        items: CartItemsFromUser
    };
    this.cart = updatedCart;
    return this.save();
}
userSchema.methods.deleteCartProduct = function (product) {
    const CartItemsFromUser = this.cart.items.filter((item => { return item.productId.toString() !== product._id.toString() }));
    this.cart.items = CartItemsFromUser
    return this.save();
}
userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}
// userSchema.methodgetOrder() {
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
//     }
module.exports = mongoose.model('user', userSchema);