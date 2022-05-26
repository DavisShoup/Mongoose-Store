const express = require('express');
const Product = require('../models/product.js')
const seedData = require('../models/seedData.js')
const router = express.Router();

//SEED
router.get('/seed', (req,res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(seedData, (error,data) => {
        res.redirect('/products');
    });
});

//INDEX
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

//NEW

router.get('/new', (req, res) => {
    res.render('new.ejs');
})

//DELETE
router.delete("/:id", (req,res) => {
    Product.findByIdAndRemove(req.params.id, (error, deleteProduct) => {
        res.redirect("/products");
    })  
})

//UPDATE
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
        },
        (error, updateProduct) => {
    res.redirect(`/products/${req.params.id}`)
    });
});

router.patch('/:id/buy', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body,
    {
        new: true,
    }, 
    (error, updateQty) => {
        updateQty.qty -= 1;
        updateQty.save();
    });
    Product.findByIdAndUpdate(req.params.id, req.body,
    {
        new:true,
    }, 
    (err, showNewQty) => {
        res.redirect(`/products/${req.params.id}`);
    });
    // res.redirect('/products')
});


//CREATE

router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
	});
});

//EDIT
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, editProduct) => {
        res.render('edit.ejs', {
            product: editProduct
        });
    });
});


//SHOW

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        });
    });
});

module.exports = router