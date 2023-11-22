const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./Routes/adminRoute');
const shopRoute = require('./Routes/shopRoute');
const UserDb = require('./Models/user');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');
// app.use((req, res, next) => {
//     UserDb.findUserById('655cc44e757cb6df54236a77').then(user => {
//         if (user) {
//             req.user = new UserDb(user.name, user.email, user.cart, user._id)
//         } else {
//             req.user = {};
//         }
//     })
//         .catch(err => console.log(err))
//         .finally(() => next());
// });
app.set('views', path.join(__dirname, '..', 'Frontend', 'Views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'Public')));
app.use('/admin', adminRoute);
app.use(shopRoute);
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected");
    app.listen(3000);
}
).catch(err => {
    console.log(err);
})
