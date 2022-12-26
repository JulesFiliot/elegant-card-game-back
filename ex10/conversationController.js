import conversation from "./conversation.js";
export function sendConversation(conversation){
    let id=conversation.id
    const url='http://localhost:8083/conversation'+id;

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({

            id_emeteur: conversation.message.emeteur,
            contenu:conversation.message.message,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));



}
export async function getConversation(id){
    const url='http://localhost:8083/conversation'+id;
    const response = await fetch(url);
    const data = await response.json();
    return data;

}