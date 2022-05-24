const express = require('express')
const app = express()
const port = 3000
const Product = require('./models/products.js')


//INDEX
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/index', (req, res) => {
    res.send("Index Page!")
});

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW

//LISTENING

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

