const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./Routes/adminRoute');
const shopRoute = require('./Routes/shopRoute');
const UserDb = require('./Models/user');
const mongoConnect = require('./util/database').mongoConnect;
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    UserDb.findUserById('655cc44e757cb6df54236a77').then(user => {
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
mongoConnect(() => {
    app.listen(3000, () => console.log("Server is running"));
})
