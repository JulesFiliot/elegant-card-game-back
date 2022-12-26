const cors = require('cors');
const express = require('express')
const io = require('socket.io');
const http = require('http');
const routes = require('./api/route');
const app = express();
const port = 3001;

//ce code de websocket est a tester avec le front

// si fonctionnel, mettre en place un socket.emit avec les
// les informations necessaires pour le front en JSON 
const server = http.createServer(app);
const socketIo = io(server, {
    cors: {
      origin: "*",
    }
});

socketIo.on('connection', (socket) => {
    console.log("Client connected");
});

socketIo.on('connection', (socket) => {
    socket.emit('message', 'Hello from the server!');
});
//fin du code a tester avec le front
  

let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.listen(port, function() {
    console.log('Serveur ecoute sur le port: ' + port);
});