 class User {
    constructor(userDTO, socket) {
        this.id = userDTO.id;
        this.surName = userDTO.surName;
        this.lastName = userDTO.lastName;
        this.socket=socket
    }
}

 export default User;