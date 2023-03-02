
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3000
require('dotenv').config();
const rooms = require('./routes/roomRoutes')
const users = require('./routes/userRoutes')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const downloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');


const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001',
  }));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdkfjhqwejhccpauwe20jsadkjfh';

app.get('/account', (req, res) => {
    res.send('This is my account! ')
})

// Create new User
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await User.create({
            name, 
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
    
        res.json(userDoc);
    } catch (error) {
        console.error(error);
    }
    
})

app.post('/login', async (req, res) => {

    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;

    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo_' + Date.now() + '.jpg';

    await downloader.image({
        url : link,
        dest : __dirname + '/uploads/' + newName,
    })

    res.json(newName);
        
})

const photosMiddleware = multer({dest: 'server/uploads'});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('server/uploads/', ''));
    }
    res.json(uploadedFiles);
})


// ROUTES
app.use('/api/v1', rooms);
//app.use('/', users);

app.listen(PORT, console.log(`Server running on port number ${PORT}...`));