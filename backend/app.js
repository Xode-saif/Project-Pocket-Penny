const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { db } = require('./db/db')
const { readdirSync } = require('fs')
const app = express()
const userRoute = require('./routes/route')
const {restrictToLoggedinUserOnly} = require('./Middleware/restrict')
const transactionsRoute  = require('./routes/transactions')
require('dotenv').config()

const PORT = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cookieParser()); // make cookie available in req.cookies
// app.use(cors())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
app.use("/user",userRoute) //data will sent here (post)
app.use("/api/v1",restrictToLoggedinUserOnly, transactionsRoute);
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log("Server is listening to port: ", PORT)
    })
}

server()