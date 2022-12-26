—— NGINX ——

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
            proxy_pass http://localhost:3004/;
        }

    }
```
3. you can now start nginx with the `nginx` command

Microservices can now be accessed trough one unique address and port: localhost:8084
