const express = require('express');
const path = require('path'); 
const bodyparser = require('body-parser'); 
const router = express.Router();
 
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;
 

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))


app.set('view engin','pug');
 

const emproutes = require('./routers/employees.js');
const cateroutes = require('./routers/category.js');
const assetroutes = require('./routers/assetmaster.js');
const issueasset = require('./routers/issueasset.js');
app.use(emproutes);
app.use(cateroutes);
app.use(assetroutes);
app.use(issueasset);


app.listen(port, ()=>{
    console.log(`Listen the port ${port}`);
});