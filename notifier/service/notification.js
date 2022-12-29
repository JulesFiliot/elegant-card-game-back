const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
};

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
    stompit.connect(connectOptions, (error, client) => {
      if (error) {
        console.error('Erreur de connexion à ActiveMQ :', error);
        return;
      }
    
      console.log('Connecté à ActiveMQ');

      const sendOptions = {
        destination: '/queue/notifications',
      };
    
      const frame = client.send(sendOptions);
      frame.write(JSON.stringify(req.body));
      frame.end();
    });
    res.sendStatus(200);
};