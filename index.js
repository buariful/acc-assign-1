const express = require('express');
require('dotenv').config();
const cors = require("cors");
const userRoutes = require('./routes/user')

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());



app.use('/user', userRoutes);
// server running
app.get('/', (req, res) => {
    res.send("server is running smoothly")
})
app.listen(port, () => {
    console.log('listening port ', port);
})
