const express = require('express');
const router = express.Router();
const {createOrUpdate, readAllRooms, getRoomById, deleteRoomById } = require('../controllers/roomController');

//GET ALL ROOMS
router.get('/rooms', async (req, res) => {

    try {
        const allRooms = await readAllRooms();
        res.json(allRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({err: 'Something went wrong...'});
    }
})

// GET ROOM BY ID
router.get('/rooms/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const room = await getRoomById(id);
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong...' })
    }

})

// CREATE ROOM
router.post('/rooms', async(req, res) => {
    const room = req.body;

    try {
        const newRoom = await createOrUpdate(room);
        res.json(newRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong...' })
    }

})

// DELETE ROOM
router.delete('/rooms/:id', async(req, res) => {

    const { id } = req.params;

    try {
        res.json(await deleteRoomById(id));
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong...' })
    }

})



module.exports = router;
