import conversation from "./conversation.js";
export function sendConversation(conversation){

    const url='http://localhost:8083/conversation';

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            id:conversation.id,
            id_emeteur: conversation.message.emeteur,
            id_recepteur:conversation.message.receveur,
            message:conversation.message.message,
            time:conversation.message.heure,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));



}