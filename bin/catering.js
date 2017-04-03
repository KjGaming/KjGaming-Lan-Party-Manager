let Message = require('../models/message');


module.exports = function ( io, user ) {
	'use strict';
	let aRoom = 'aCat';
	let uRoom = 'uCat';
	let u_io = io.of('/catering');
	u_io.on('connection', function ( socket ) {
		socket.join('some room');

		socket.on('joinRoom', function ( room ) {
			socket.join(room);
		});

		socket.on('newOrder', function ( data ) {
			socket.broadcast.to('aCat').emit('pushAdminOrder', data);
		});

		socket.on('refresh', function ( data ) {
			socket.broadcast.to('uCat').emit('refreshDB');
		});

		socket.on('disconnect', function () {
		})
	});

};
