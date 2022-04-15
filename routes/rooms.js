const express = require('express');
const RoomController = require('../controllers/rooms.js');

const router = express.Router();

router
	.route('/')
	.get(RoomController.getRooms)
	.post(RoomController.createRoom);

router
	.route('/:id')
	.get(RoomController.getRoom)
	.put(RoomController.updateRoom)
	.delete(RoomController.deleteRoom);

module.exports = router;
