
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3000
const rooms = require('./routes/roomRoutes')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send({ message: "Hello World!" })
})

app.get('/hello', (req, res) => {
    res.send({ message: 'Task Manager App'})
})

// ROUTES
app.use('/api/v1', rooms);

app.listen(PORT, console.log(`Server running on port number ${PORT}...`));