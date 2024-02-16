const express = require("express")
const cors = require("cors")

const products = require("./products")

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to our online Shop api")
})

app.get("/products", (req, res) => {
    res.send(products)
})

app.listen(PORT,  console.log(`Server running at ${PORT} `) )