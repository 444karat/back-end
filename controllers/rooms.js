const knexConfig = require('../db/knexfile.js');
const db = require('knex')(knexConfig[process.env.NODE_ENV],
);

class RoomController {
	constructor() {}

	async getRooms(request, responce, next) {
	 	try {
			return await responce.status(200).json( db('rooms').select('*').from('rooms'));
		} catch (error) {
			console.log(error);
		}
	}

	async getRoom(request, responce, next) {
		const id = request.param.id;
		try {
			return await responce.status(200).json( db('rooms').select('*').from('rooms').where({id}).returning(roomId));
		} catch (error) {
			console.log(error);
		}
	}

	async createRoom(request, responce, next) {
		const author = request.param.login;
		try {
			return await responce.status(200).json( db('rooms').insert({author}).returning(roomId));
		} catch (error) {
			console.log(error);
		}
	}

	 async updateRoom(request, responce, next) {
		const {id, description} = request.param;
		try {
			return await responce.status(200).json( db('rooms').where({roomId: id}).update({description}));
		} catch (error) {
			console.log(error);
		}
	 }

	 async deleteRoom(request, responce, next) {
		const id = request.param.id;
		 try {
			 return await responce.status(200).json( db('rooms').where({roomId: id}).del());
		 } catch (error) {
			 console.log(error);
		 }
	 }
}
module.exports = new RoomController();
