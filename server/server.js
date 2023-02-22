
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3000
const rooms = require('./routes/roomRoutes')
const users = require('./routes/userRoutes')

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

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     res.send({name, email, password});
// })

// ROUTES
app.use('/api/v1', rooms);
app.use('/api/v1', users);

app.listen(PORT, console.log(`Server running on port number ${PORT}...`));