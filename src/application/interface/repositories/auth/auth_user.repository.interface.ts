import {RequestRegisterDTO} from "../../../../application/dto/auth/register/request.register.dto";
import {ResponseRegisterDTO} from "../../../../application/dto/auth/register/response.register.dto";
import { UserEntity } from "../../../../domain/entities/auth/user.entity";


export interface IAuthUserRepository {
    
    findByEmail(email: string): Promise<UserEntity | null>;
    create(requestRegisterDTO: RequestRegisterDTO): Promise<UserEntity>;

}