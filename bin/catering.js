module.exports = function ( io ) {
	'use strict';
	let u_io = io.of('/catering');
	u_io.on('connection', function ( socket ) {

		socket.on('joinRoom', function ( room ) {
			socket.join(room);
		});

		socket.on('newOrder', function () {
			socket.broadcast.to('aCat').emit('pushAdminOrder');
		});

		socket.on('refresh', function (data) {
			socket.broadcast.to('uCat').emit('refreshDB', data);
		});

		socket.on('disconnect', function () {
		})


	});

};
