const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//Creating MySQL Connection =============================================
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'foo',
    password: 'foo',
    database: 'shopping-list',
})

conn.connect((err) => {
    if (err) {
        console.log('Error connecting ')
        return
    }
    console.log('Connection established ')
})

// Get all products==============================================
app.get('', (req, res) => {
    let sqlQuery = 'SELECT * from products'
    conn.query(sqlQuery, (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

// Add a product  ==============================================
app.post('', (req, res) => {
    let product = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        amount: req.body.amount,
    }

    let sqlQuery = 'INSERT INTO products SET ?'

    conn.query(sqlQuery, product, (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

// UPDATE product  ==============================================

app.put('/', (req, res) => {
    const { id, name, category, amount } = req.body
    let sqlQuery =
        "UPDATE products SET name='" +
        name +
        "', category='" +
        category +
        "',  amount='" +
        amount +
        "' WHERE id=" +
        id

    conn.query(sqlQuery, (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

// Listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))
