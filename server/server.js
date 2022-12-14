require('dotenv').config()
const express = require('express')
const db = require('./db')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

// GET ALL RESTAURANTS
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants")
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET ONE RESTAURANT
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const results = await db.query(
            "SELECT * FROM restaurants WHERE id = $1",
            [req.params.id]
            )
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// CREATE A RESTAURANT
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
        )
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// UPDATE RESTAURANT
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
            )
            res.status(200).json({
                status: "success",
                data: {
                    restaurant: results.rows[0]
                }
            })
    } catch (err) {
        console.log(err)
    }
})

// DELETE RESTAURANT
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id])
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})



app.listen(port, () => {
    console.log('Server be live')
})