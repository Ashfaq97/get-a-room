const express = require('express');
const router = express.Router();
const {createOrUpdateUser,  } = require('../controllers/userController');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT = bcrypt.genSalt(7);


// CREATE ROOM
router.post('/users', async(req, res) => {
    const {name, email, password} = req.body;
    const user = {
        name,
        email,
        password: bcrypt.hashSync(password, BCRYPT_SALT)
    }

    try {
        const newUser = await createOrUpdateUser(user);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong...' })
    }

})

module.exports = router;