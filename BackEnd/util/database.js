const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback) => {
    MongoClient.connect(process.env.DB_URL).then(result => {
        console.log("Connected");
        callback(result)
    }).catch(err => {
        console.log(err);
    });
}
module.exports = mongoConnect;