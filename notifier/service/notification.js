const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
};


exports.notify = (req,res,callback) => {
    res.send(req.params.msg);
    stompit.connect(connectOptions, (error, client) => {
        if (error) {
          console.error('Erreur de connexion à ActiveMQ :', error);
          return;
        }
      
        console.log('Connecté à ActiveMQ');
      
        // Envoyer un message à une file d'attente nommée "ma_file_d_attente"
        const sendOptions = {
          destination: '/queue/notifications',
        };
      
        const frame = client.send(sendOptions);
        frame.write('mon message');
        frame.end();
    });
    return 200
};


stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.error('Erreur de connexion à ActiveMQ :', error);
    return;
  }

  console.log('Connecté à ActiveMQ');

  // Souscrire à une file d'attente nommée "ma_file_d_attente"
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


exports.notif = (req,res, callback) => {
    let user_name = req.body.user;
    let pwd = req.body.password;
    res.send("User name = "+user_name+", password is "+pwd);
};


 
