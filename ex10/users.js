let user = class {
    constructor(userDTO, socket) {
        this.name = userDTO.name;
        this.id = userDTO.id;
        this.socket=socket
    }
};