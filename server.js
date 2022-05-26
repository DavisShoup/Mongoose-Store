const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT
const methodOverride = require("method-override");
const { redirect } = require('express/lib/response');
const productStore = require('./controllers/products.js')

// Database Connection

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//MIDDLEWARE & BODY PARSER

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use('/products', productStore)

//LISTENING

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

