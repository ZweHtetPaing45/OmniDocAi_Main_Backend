import bcrypt from 'bcrypt';

export class HashPassword{

    static hash(password: string){
        return bcrypt.hash(password,10);
    }

    static compare(password: string,owner_password: string){
        return bcrypt.compare(password,owner_password);
    }

}