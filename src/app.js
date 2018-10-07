const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Routes
const users = require('./routes/users')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shops')

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection erro"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
})

// Routes


// Models
var User = require('../models/user.js')
var Shop = require('../models/shop.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

console.log('Hello World')
console.log(process.env)

// USERS API ENDPOINTS
app.use('/api/users', users)

// QUIZZES API ENDPOINTS

// "/api/quizzes"
//     GET: finds all quizzes
//     POST: creates a new quiz

app.get('/api/quizzes', (req,res) => {
})

app.post('/api/quizzes', (req,res) => {
})

// "/api/quizzes/:id"
//     GET: find quiz by id
//     PUT: update quiz by id
//     DELETE: delete quiz by id

app.get("/api/quizzes/:id", (req, res) => {
})

app.put("/api/quizzes/:id", (req, res) => {
})

app.delete("/api/quizzes/:id", (req, res) => {
})

// SHOPS API ENDPOINTS

// "/api/shops"
//     GET: finds all shops
//     POST: creates a new shop

app.get('/api/shops', (req,res) => {
})

app.post('/api/shops', (req,res) => {
})

// "/api/shops/:id"
//     GET: find shop by id
//     PUT: update shop by id
//     DELETE: delete shop by id

app.get("/api/shops/:id", (req, res) => {
})

app.put("/api/shops/:id", (req, res) => {
})

app.delete("/api/shops/:id", (req, res) => {
})

// Get all Shops
app.get('/shops', (req, res) => {
    console.log("app.get/shops")
    Shop.find((error, shops) => {
        if (error) { console.error(error) }
        res.send({
            shops: shops
        })
    })
})

// Fetch a single Shop
app.get('/shop/:id', (req, res) => {
    var db = req.db;
    Shop.findById(req.params.id, (error, shop) => {
        if (error) { console.log(error) }
        res.send(shop)
    })
})

// Add a new shop to the database
app.post('/shops', (req, res) => {
    var db = req.db;
    console.log(req)
    var name = req.body.name
    var location = req.body.location
    var shop = new Shop({
        name: name,
        location: location
    })

    console.log(shop)

    shop.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Shop saved successfully',
            shop: shop
        })
    })
})

// Update a Shop
app.put('/shops/:id', (req, res) => {
    var db = req.db;
    Shop.findById(req.params.id, (error, shop) => {
        if (error) { console.log(error) }

        shop.name = req.body.name
        shop.location = req.body.location
        shop.save( error => {
            if (error) { console.log(error) }
            res.send({
                success: true
            })
        })
    })
})

// app.get('/posts', (req,res) => {
//     res.send(
//         [{
//             title: "Welcome",
//             description: "Blue Star is getting a fresh new look!"
//         }]
//     )
// })

// PORT environment variable
const port = process.env.port || 8081
app.listen(port, () => console.log(`Listening on port ${port}...`))
