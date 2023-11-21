const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class UserDb {
    constructor(name, email) {
        this.name = name,
            this.email = email
    }
    save() {
        const db = getDb();
        return db.collection('user').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
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