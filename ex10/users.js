 class User {
    constructor(userDTO, socket) {
        this.name = userDTO.surName;
        this.id = userDTO.id;
        this.socket=socket
    }
}

 export default User;