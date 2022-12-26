import express from 'express';
import { Server } from "socket.io";
import {createServer} from "http";
import  {getUsers,getUser}  from "./userController.mjs";
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
    notify_change_users();
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
        notify_change_users();

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

    socket.on('userDisconnected', (userId) => {
        console.log(typeof userId);
        for ( let usr of ConnectedUsers){
            console.log(usr.socket.id)
            if (usr.id===userId){
                ConnectedUsers.splice(ConnectedUsers.indexOf(usr),1)
                console.log(ConnectedUsers)
                console.log(usr.surName+' disconnected')
                notify_change_users();
                break;
            }
        }
    });

    socket.on('disconnect',()=>{
        sockets.splice(sockets.indexOf(socket), 1);
        console.log(socket.id);

        for ( let usr of ConnectedUsers){
            console.log(usr.socket.id)

            if (usr.socket.id===socket.id){
                ConnectedUsers.splice(ConnectedUsers.indexOf(usr),1)
                console.log(ConnectedUsers)
                console.log(usr.surName+' disconnected')

                notify_change_users();
                break;
            }
        }
        console.log('disconnected')
    })
});

server.listen(9999)