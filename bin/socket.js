let clientListNames = [];
let Chat = require('../models/chat');

module.exports = function (io, user) {
    'use strict';
    let c_io = io.of('/chat');
	c_io.on('connection', function (socket) {
        // Send message
        socket.on('newMessage', function (data) {
            socket.emit('chatUpdate', data);
            socket.broadcast.emit('chatUpdate', data);
			let chat = new Chat({
				nickName: data.nickName,
				text: data.text,
				time: data.time
			});
			chat.save();
        });

        // check if new user is join
        socket.on('newUser', function (name) {
            clientListNames.push({
                'id': socket.id,
                'name' : name
            });
            console.log(socket.id);
			Chat.find().limit(10).exec(function (err, result) {

				for(let oldChat of result){
					socket.emit('chatUpdate',
						{
							'nickName': oldChat.nickName,
							'text': oldChat.text,
							'time': oldChat.time,
						});
				}

				socket.emit('chatUpdate',
					{'nickName': '', 'text': name + ' ist dem Chat beigetreten'});
				socket.broadcast.emit('chatUpdate',
					{'nickName': '', 'text': name + ' ist dem Chat beigetreten'});
			});

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
                {'nickName': '', 'text': name + ' hat den Chat verlassen'});
            socket.broadcast.emit('chatUpdate',
                {'nickName': '', 'text': name + ' hat den Chat verlassen'});
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
                {'nickName': '', 'text': user + ' hat den Chat verlassen'});
            socket.broadcast.emit('chatUpdate',
                {'nickName': '', 'text': user + ' hat den Chat verlassen'});
            socket.emit('update-user', clientListNames);
            socket.broadcast.emit('update-user', clientListNames);

        })
    });
};
