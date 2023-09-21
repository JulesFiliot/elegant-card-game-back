## Elegant Card Game back-end

This school project consists of an online card game created within 24 hours in a team of five students. The features include an authentication system using username and password, a card purchasing/selling system, a waiting room to join a game, a turn-based combat system, statistics for cards and money, and an in-game instant messaging system with persistent message history. The application follows a microservices architecture, with a React front-end and multiple back-ends using Node.js and Java Spring Boot. ActiveMQ message broker is also utilized for notifications and user management, while a reverse proxy is used for communication between the different services. The messaging, notification, and combat systems use web sockets developed with Socket.io on Node.js.

[Front-end repo](https://github.com/JulesFiliot/elegant-card-game-front)

[Live demo](https://www.youtube.com/watch?v=yVKOPEcM_EU)

# NGINX

1. (install nginx if needed)
2. configure nginx by modifying the file located at '/etc/nginx/nginx.conf' (or '/usr/local/etc/nginx/nginx.conf' on mac):
put the following code in the file :
```
server {
    listen       8084;
    server_name  localhost;

    location /duel/ {
        proxy_pass http://localhost:3002/;
    }

    location /matchmaking/ {
        proxy_pass http://localhost:3003/;
    }

    location /notifier/ {
        proxy_pass http://localhost:3001/;
    }

    location /mainapp/{
        proxy_pass http://localhost:8083/;
    }

    location /chatws/ {
        proxy_pass http://localhost:9999/socket.io/;
    }
    
    location /notifierws/ {
        proxy_pass http://localhost:3001/socket.io/;
    }
}
```
3. you can now start nginx with the `nginx` command

Microservices can now be accessed trough one unique address and port: localhost:8084
