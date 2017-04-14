module.exports = function ( io ) {
	let nsp = io.of('/vote');
	nsp.on('connection', function ( socket ) {

		socket.on('joinRoom', function ( room ) {
			let roomLength = socket.adapter.rooms[room];
			if(roomLength == null){
				socket.join(room);
			}
			else if (roomLength.length <= 1) {
				socket.join(room);
			} else {
				socket.emit('error123', 'Zu viele User in diesem Vote.');
			}
		});

		// Send message
		socket.on('ready', function ( user, room ) {
			socket.broadcast.to(room).emit('');
			socket.emit('chatUpdate', data);
			socket.broadcast.emit('chatUpdate', data);
		});

		// check if new user is join
		socket.on('newUser', function ( data ) {
			socket.emit('chatUpdate',
				{'userName': '', 'text': data + ' ist dem Chat2'});
			socket.broadcast.emit('chatUpdate',
				{'userName': '', 'text': data + ' ist dem Chat2'});
		});

		// check if user is leave
		socket.on('leaveUser', function ( room ) {
			socket.leave(room);
		});
	});
};
