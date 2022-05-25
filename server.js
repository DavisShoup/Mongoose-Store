const express = require('express');
const app = express();
require('dotenv').config();
const Product = require('./models/products.js');
const mongoose = require('mongoose');
const seedData = require('./models/seedData');
const PORT = process.env.PORT
const methodOverride = require("method-override");
const { redirect } = require('express/lib/response');

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});



//MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//SEED
app.get('/products/seed', (req,res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(seedData, (error,data) => {
        res.redirect('/products');
    });
});

//INDEX
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

//NEW

app.get('/products/new', (req, res) => {
    res.render('new.ejs');
})

//DELETE
app.delete("/products/:id", (req,res) => {
    Product.findByIdAndRemove(req.params.id, (error, deleteProduct) => {
        res.redirect("/products");
    })  
})

//UPDATE

app.patch('/products/:id', (req, res) => {
    Product.findById(req.params.id, (error, updateQty) => {
        updateQty.qty = updateQty.qty - 1;
        updateQty.save();
    });
    res.redirect(`/products/${req.params.id}`)
});


//CREATE

app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
	});
});

//EDIT
app.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, editProduct) => {
        res.render('edit.ejs', {
            product: editProduct
        });
    });
});


//SHOW

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        });
    });
});

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

