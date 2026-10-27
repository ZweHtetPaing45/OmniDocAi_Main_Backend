

export class UserEntity {

    constructor(
        public id : number | null,
        public username : string,
        public email : string,
        public password : string | null,
        public create_at : Date | null
    ){}

}