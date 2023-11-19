const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./Routes/adminRoute');
const shopRoute = require('./Routes/shopRoute');
const mongoConnect = require('./util/database').mongoConnect;
require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use('/admin', adminRoute);
app.use(shopRoute);
mongoConnect(() => {
    app.listen(3000, () => console.log("Server is running"));
})
