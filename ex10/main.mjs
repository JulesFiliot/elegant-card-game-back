import express from 'express';
import { Server } from "socket.io";
import {createServer} from "http";


const app = express();
const server = createServer(app);

app.use(express.static('./public'));
const port = 9999
console.log("server is running on port", port);
const ioServer = new Server(server);
var sockets= []
ioServer.on('connection', function(socket){

    sockets.push(socket)

    socket.username='anonyme'+sockets.indexOf(socket)
    for (let s of sockets){
        console.log(s.username)
    }
    socket.on('username',function(data){
        socket.username=data
        console.log(data)
        console.log('socket username='+socket.username)
    })


    socket.on('chat message', function(data) {
        data=JSON.parse(data);
        console.log(data)
        console.log("going throw list of sockets")

        const username_receveur=data.receveur;
        console.log("for "+username_receveur)
        const username_emeteur=data.emeteur;
        const message=data.message;

        for (let sock of sockets){
            console.log("current socket username ="+sock.username)
            if (sock.username==username_receveur){
                console.log("found")
                sock.emit('Reponse',message)
            }
        }
    });
    socket.on('disconnect',function(socket){
        sockets.splice(sockets.indexOf(socket), 1);

    })
});

server.listen(9999)
