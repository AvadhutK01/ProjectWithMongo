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
app.set('views', path.join(__dirname, '..', 'Frontend', 'Views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'Frontend', 'Public')));
app.use((req, res, next) => {
    UserDb.findById('655dabe6ec762e511f7f538a')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
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
