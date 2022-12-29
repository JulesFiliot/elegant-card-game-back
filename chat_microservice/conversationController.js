import fetch from "node-fetch";
import conversation from "./conversation.js";

export async function sendConversation(conversation){
    let id = conversation.id
    const url='http://localhost:8084/mainapp/Conversation/'+id;

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            id_emetteur: conversation.message.id_emetteur,
            content: conversation.message.content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => console.log('conversation sent to main-app OK'));



}
export async function getConversation(id){
    const url='http://localhost:8084/mainapp/Conversation/'+id;
    const response = await fetch(url);
    const data = await response.json();
    return data;

}