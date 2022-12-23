const cors = require('cors');
const express = require('express')
const app = express();
const port = 3001;
const routes = require('./api/route');

let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.listen(port, function() {
    console.log('Serveur ecoute sur le port: ' + port);
});