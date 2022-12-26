class Conversation {
    constructor(idemeteur,idrecepteur,message) {
        if (idemeteur < idrecepteur) {
            this.id = idemeteur.toString()+'_'+idrecepteur.toString();
        }
        else {
            this.id = idrecepteur.toString()+'_'+idemeteur.toString();
        }
        this.message = JSON.stringify(
            {
                id_emetteur:idemeteur,
                content:message,
            });
    }
}

export default Conversation;