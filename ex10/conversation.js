class Conversation {
    constructor(idemeteur,idrecepteur,message) {
        var d = new Date();
        var n = d.toLocaleTimeString();
        if(id1<id2){
            this.id=idemeteur.toString()+idrecepteur.toString()
        }
        else{
            this.id=idemeteur.toString()+idrecepteur.toString()
        }
        this.message = JSON.stringify(
            {emeteur:idemeteur,
                recepteur:idrecepteur,
                message:message,
                heure:n,

            });

    }
}

export default Conversation;