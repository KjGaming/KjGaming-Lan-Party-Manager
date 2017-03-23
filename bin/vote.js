module.exports = function (io) {
    'use strict';
    var nsp = io.of('/vote');
    nsp.on('connection', function (socket) {
        // Send message
        socket.on('ready', function (data) {
            socket.emit('chatUpdate', data);
            socket.broadcast.emit('chatUpdate', data);
        });

        // check if new user is join
        socket.on('newUser', function (data) {
            socket.emit('chatUpdate',
                {'userName': '', 'text': data + ' ist dem Chat2'});
            socket.broadcast.emit('chatUpdate',
                {'userName': '', 'text': data + ' ist dem Chat2'});
        });

        // check if user is leave
        socket.on('leaveUser', function (data) {
            socket.emit('chatUpdate',
                {'userName': '', 'text': data + ' hat den Chat verlassen'});
            socket.broadcast.emit('chatUpdate',
                {'userName': '', 'text': data + ' hat den Chat verlassen'});
        });
    });
};
