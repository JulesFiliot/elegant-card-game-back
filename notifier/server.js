const express = require('express')
const app = express();
const port = 3001;
const routes = require('./api/route');
app.use(routes);
app.listen(port, function() {
    console.log('Serveur ecoute sur le port: ' + port);
});