const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index.ejs')
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit("is_online", '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on("disconnect", function(username) {
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  });

  socket.on("chat_message", function(message) {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });
})

const port = 3000;
http.listen(port, () => {
  console.log('Server is listening on *:' + port);
});