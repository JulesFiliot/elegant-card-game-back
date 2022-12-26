const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
};

//TODO fonction qui emit les informations nécessaires au front
// sur le websocket

// dans ce code on depile les message en queue
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
  
        console.log('Message reçu :', body);
      });
    });
  });

// test avec des request get, la fonction notif en dessous est un 
// exemple de requete post fonctionnelle, pour l'utiliser avec
// activemq, il faut passer le code de "stompit.connect..." dans
// la fonction notif

// notify met en queue le message qu'il recoit en url
exports.notify = (req,res,callback) => {
    res.send(req.params.msg);

    stompit.connect(connectOptions, (error, client) => {
        if (error) {
          console.error('Erreur de connexion à ActiveMQ :', error);
          return;
        }
      
        console.log('Connecté à ActiveMQ');
      
        // Envoyer un message à une file d'attente nommée "notification"

        const sendOptions = {
          destination: '/queue/notifications',
        };
      
        const frame = client.send(sendOptions);
        frame.write('mon message');
        frame.end();
    });

    return 200
};

exports.notif = (req,res, callback) => {
    let user_name = req.body.user;
    let pwd = req.body.password;
    res.send("User name = "+user_name+", password is "+pwd);
};