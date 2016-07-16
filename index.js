const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});
io.on('connection', (socket) => {
  io.emit('user connected', 'user connected');
  console.log('a user connected');

  socket.on('disconnect', () => {
    io.emit('user disconnected', 'user disconnected');
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`message:${msg}`);
  });
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});
