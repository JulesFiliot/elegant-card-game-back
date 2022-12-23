import fetch from "node-fetch";

export function getUser(id){
    const url='http://localhost:8083/user/'+id;
    return fetch(url)
        .then(res => res.text())
        .then(text => {return (text)});

}
export function getUsers(){

    const url='http://localhost:8083/users';

    return fetch(url)
        .then(res => res.text())
        .then(text => {return (text)});




}
export function onloadindex(){
    console.log(getUsers())
    document.getElementById("idR")
}
