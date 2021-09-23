const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");


//import route
const personnelRoutes = require('./routes/personnel');
const votantRoutes = require('./routes/votant');
const candidatRoutes = require('./routes/candidat');
const adminRoutes = require('./routes/admin');
const app = express();


//load config

dotenv.config({path: './config/config.env'});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
})

app.use('/api/personnel/', personnelRoutes);
app.use('/api/votant/', votantRoutes);
app.use('/api/candidat/', candidatRoutes);
app.use('/api/admin/', adminRoutes)
module.exports = app;