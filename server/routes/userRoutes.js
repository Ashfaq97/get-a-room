const express = require('express');
const router = express.Router();
const {createUser } = require('../controllers/userController');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT = bcrypt.genSalt(7);


// CREATE ROOM
router.post('/register', async(req, res) => {

    try {
        const newUser = await createUser(user);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong...' })
    }

})

module.exports = router;