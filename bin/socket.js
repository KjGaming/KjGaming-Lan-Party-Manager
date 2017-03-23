let clientListNames = [];

module.exports = function (io, user) {
    'use strict';
    let nsp = io.of('/chat');
    nsp.on('connection', function (socket) {
        // Send message
        socket.on('newMessage', function (data) {
            console.log(socket.id);
            socket.emit('chatUpdate', data);
            socket.broadcast.emit('chatUpdate', data);
        });

        // check if new user is join
        socket.on('newUser', function (name) {
            clientListNames.push({
                'id': socket.id,
                'name' : name
            });
            console.log(socket.id);
            socket.emit('chatUpdate',
                {'userName': '', 'text': name + ' ist dem Chat beigetreten'});
            socket.broadcast.emit('chatUpdate',
                {'userName': '', 'text': name + ' ist dem Chat beigetreten'});
            socket.emit('update-user', clientListNames);
            socket.broadcast.emit('update-user', clientListNames);
        });

        // check if user is leave
        socket.on('leaveUser', function (name) {
            for(let i = 0; i < clientListNames.length; i++){
                if(clientListNames[i].id == socket.id){
                    clientListNames.splice(i,1);
                    break;
                }
            }
            socket.emit('chatUpdate',
                {'userName': '', 'text': name + ' hat den Chat verlassen'});
            socket.broadcast.emit('chatUpdate',
                {'userName': '', 'text': name + ' hat den Chat verlassen'});
            socket.emit('update-user', clientListNames);
            socket.broadcast.emit('update-user', clientListNames);
        });

        socket.on('disconnect', function () {
            let user = '';
            for(let i = 0; i < clientListNames.length; i++){
                if(clientListNames[i].id == socket.id){
                    user = clientListNames[i].name;
                    clientListNames.splice(i,1);
                    break;
                }
            }
            socket.emit('chatUpdate',
                {'userName': '', 'text': user + ' hat den Chat verlassen'});
            socket.broadcast.emit('chatUpdate',
                {'userName': '', 'text': user + ' hat den Chat verlassen'});
            socket.emit('update-user', clientListNames);
            socket.broadcast.emit('update-user', clientListNames);

        })
    });
};
