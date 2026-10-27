import {RequestRegisterDTO} from "../../../application/dto/auth/register/request.register.dto";
import {IAuthUserRepository} from "../../../application/interface/repositories/auth/auth_user.repository.interface";
import {UserEntity} from "../../../domain/entities/auth/user.entity";
import {AppError} from "../../errors/app-error";
import { HashPassword } from "../../../infrastructure/util/hash-password.util";


export class AuthUserRegisterUseCase{

    constructor(
        private readonly authUserRepository: IAuthUserRepository 
    ){}

    async execute(requestRegisterDTO: RequestRegisterDTO): Promise<UserEntity>{

        const user : any = await this.authUserRepository.findByEmail(requestRegisterDTO.email);

        if(user){
            throw new AppError("User already exists", 400);
        }else{
            
            const hashedPassword = await HashPassword.hash(requestRegisterDTO.password);

            if(!hashedPassword){
                throw new AppError("Error hashing password", 500);
            }

            requestRegisterDTO.password = hashedPassword;

            const responseRegisterDTO = await this.authUserRepository.create(requestRegisterDTO);

            return responseRegisterDTO;

        }

    }

}