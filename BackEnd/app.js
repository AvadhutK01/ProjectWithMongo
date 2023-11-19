const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./Routes/adminRoute');
const shopRoute = require('./Routes/shopRoute');
const mongoConnect = require('./util/database');
<<<<<<< HEAD:BackEnd/app.js
require('dotenv').config();
=======
>>>>>>> f40e11928b14c010845799845653d776305aba26:app.js
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use('/admin', adminRoute);
app.use(shopRoute);
mongoConnect((client) => {
    console.log(client);
    app.listen(3000, () => console.log("Server is running"));
})
