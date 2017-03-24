let voteObj = {};

module.exports = function ( io ) {
  'use strict';
  let nspa = io.of('/vote');
  nspa.on('connection', socket => {

    /** Join to Tournament Room **/
    socket.on('jRoom', (room, nickname) => {
      socket.join(room);
      voteObj[room] = {
        'room': room,
        'user': []
      };

      voteObj[room].user.push({
        'nickname': nickname,
        'status' : 'join',
        'ready' : false
      });

      nspa.in(room).emit('voteObj', voteObj);
    });

    /** Socket Disconnect **/
    socket.on('disconnect', () => {
      console.log('Disconnect');
    })

  });

};
