import express from 'express';
import { Server } from "socket.io";
import {createServer} from "http";
import Conversation from './conversation.js';
import { getConversation, sendConversation } from './conversationController.js';
import  {getUser}  from "./userController.mjs";
import User  from "./users.js";
import cors from 'cors';

const app = express();
const server = createServer(app);

function notify_change_users() {
    const data = ConnectedUsers.map(u => ({ id: u.id, surName: u.surName, lastName: u.lastName }));
    ioServer.emit('refresh connected users',data);
}

app.use(cors());
app.use(express.static('./public'));
const port = 9999;
console.log("server is running on port", port);
const ioServer = new Server(server, {
    cors: {
      origin: "*",
    }
});
var sockets= [];
var ConnectedUsers=[];
ioServer.on('connection', async (socket) => {

    sockets.push(socket)
    let user;
    notify_change_users();
    socket.username='anonyme'+sockets.indexOf(socket);
    socket.on('username',function(data){
        socket.username=data;
    })
    socket.on('userConnection',async function (id) {
        const userDTO=JSON.parse(await getUser(id));
        user = new User(userDTO, socket);
        ConnectedUsers.push(user);
        notify_change_users();

    })

    socket.on('chat message', function(data) {
        data=JSON.parse(data);
        const username_receveur=data.receveur;
        const message=data.message;

        for (let u of ConnectedUsers) {
            if (u.id==username_receveur) {
                const conv = new Conversation(user.id, u.id, message);
                sendConversation(conv);
                u.socket.emit('Reponse',message);
            }
        }
    });

    socket.on('getConversation', async function (id) {
        const data = await getConversation(id);
        socket.emit('conversation', data);
    });

    socket.on('userDisconnected', (userId) => {
        for ( let usr of ConnectedUsers) {
            if (usr.id===userId) {
                ConnectedUsers.splice(ConnectedUsers.indexOf(usr),1)
                notify_change_users();
                break;
            }
        }
    });

    socket.on('disconnect',() => {
        sockets.splice(sockets.indexOf(socket), 1);

        for ( let usr of ConnectedUsers) {
            if (usr.socket.id === socket.id){
                ConnectedUsers.splice(ConnectedUsers.indexOf(usr),1)
                notify_change_users();
                break;
            }
        }
    })
});

server.listen(9999);
