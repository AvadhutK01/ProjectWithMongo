const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(process.env.DB_URL).then(result => {
        console.log("Connected");
        _db = result.db();
        callback()
    }).catch(err => {
        console.log(err);
        throw err;
    });
}
const getDb = () => {
    if (_db) {
        return _db;
    }
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;