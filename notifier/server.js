const cors = require('cors');
const express = require('express')
const { Server } = require("socket.io");
const http = require('http');
const routes = require('./api/route');
const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
};

const app = express();
const port = 3001;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const ioServer = new Server(server, {
    cors: {
      origin: "*",
    }
});

ioServer.on('connection', (socket) => {
    console.log('Client connected');

    stompit.connect(connectOptions, (error, client) => {
        if (error) {
          console.error('Erreur de connexion à ActiveMQ :', error);
          return;
        }
      
        console.log('Connecté à ActiveMQ');
      
        // Souscrire à une file d'attente nommée "notifications"
    
        const subscribeOptions = {
          destination: '/queue/notifications',
        };
      
        client.subscribe(subscribeOptions, (error, message) => {
          if (error) {
            console.error('Erreur lors de la réception du message :', error);
            return;
          }
      
          message.readString('utf-8', (error, body) => {
            if (error) {
              console.error('Erreur lors de la lecture du message :', error);
              return;
            }
            ioServer.emit('message', body);
          });
        });
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});
