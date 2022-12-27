const cors = require('cors');
const express = require('express')
const { Server } = require("socket.io");
const http = require('http');
const routes = require('./api/route');

const app = express();
const port = 3001;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const io = new Server(server, {
    cors: {
      origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('skipOpponentWait', () => {
        // todo emit for testing purpose
        socket.emit('pool:opponentFound', JSON.stringify({ id: 16, lastName: 'drill', surName: 'opsss' }));
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});
