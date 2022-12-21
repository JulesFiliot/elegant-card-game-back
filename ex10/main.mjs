import express from 'express';
import { Server } from "socket.io";
import {createServer} from "http";
import  {getUsers,getUser}  from "./userController.mjs";
import User  from "./users.js";
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.static('./public'));
const port = 9999
console.log("server is running on port", port);
const ioServer = new Server(server, {
    cors: {
      origin: "*",
    }
});
var sockets= []
var ConnectedUsers=[]
ioServer.on('connection', async (socket) => {


    sockets.push(socket)
    let user;
    let data='';
    for (let u of ConnectedUsers){
        data+=u.name+';'
    }
    socket.emit('getUsers',data)
    ioServer.emit('refresh connected users',data)
    socket.username='anonyme'+sockets.indexOf(socket)
    for (let s of sockets){
        console.log(s.username)
    }
    socket.on('username',function(data){
        socket.username=data
        console.log(data)
        console.log('socket username='+socket.username)
    })
    socket.on('userConnection',async function (id) {
        const userDTO=JSON.parse(await getUser(id))
        console.log(userDTO)
        user = new User(userDTO, socket)
        console.log('user '+user)
        ConnectedUsers.push(user)
        let data='';
        for (let u of ConnectedUsers){
            data+=u.name+';'
        }
        console.log(data)
        ioServer.emit('refresh connected users',data)

    })

    socket.on('chat message', function(data) {
        data=JSON.parse(data);
        console.log(data)
        const username_receveur=data.receveur;
        //const username_emeteur=data.emeteur;
        const message=data.message;

        console.log(ConnectedUsers);
        for (let u of ConnectedUsers){
            if (u.id==username_receveur){
                console.log("found")
                u.socket.emit('Reponse',message)
            }
        }
    });
    socket.on('disconnect',function(socket){
        sockets.splice(sockets.indexOf(socket), 1);
        ConnectedUsers.splice(ConnectedUsers.indexOf(user),1)

    })
});

server.listen(9999)
