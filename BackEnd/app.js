const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./Routes/adminRoute');
const shopRoute = require('./Routes/shopRoute');
const UserDb = require('./Models/user');
const mongoose = require('mongoose');
const product = require('./Models/product');
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    UserDb.findById('655d94e6b7e7523970d94c48').then(user => {
        if (user) {
            req.user = user;
        } else {
            req.user = {};
        }
    })
        .catch(err => console.log(err))
        .finally(() => next());
});
app.set('views', path.join(__dirname, '..', 'Frontend', 'Views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'Public')));
app.use('/admin', adminRoute);
app.use(shopRoute);
mongoose.connect(process.env.DB_URL).then(() => {
    UserDb.findOne().then(user => {
        if (!user) {
            const user = new UserDb({
                name: 'Avadhut',
                email: 'avadhut@gmail.com',
                cart: {
                    items: []
                }
            })
            try {
                user.save();
            } catch (error) {
                console.log(err);
            }
        }
    })
    console.log("connected");
    app.listen(3000);
}
).catch(err => {
    console.log(err);
})
