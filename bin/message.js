let Message = require('../models/message');

module.exports = function (io, user) {
    'use strict';
    let nsp = io.of('/message');
	nsp.on('connection', function (socket) {

        // Send message
        socket.on('newMessage', function (data) {
            socket.emit('chatUpdate', data);
            socket.broadcast.emit('chatUpdate', data);
            console.log(data);

			let msg = new Message({
				nickName: data.nickName,
				text: data.text,
				time: data.time
			});
			msg.save();
        });

        socket.on('disconnect', function () {})
    });
};
