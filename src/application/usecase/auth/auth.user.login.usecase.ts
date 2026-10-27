import { RequestLoginDTO } from "../../dto/auth/login/request.login.dto";
import { ResponseLoginDTO } from "../../dto/auth/login/response.login.dto";
import { IAuthUserRepository } from "../../../application/interface/repositories/auth/auth_user.repository.interface";
import { AppError } from "../../errors/app-error";
import { HashPassword } from "../../../infrastructure/util/hash-password.util";
import { TokenService } from "../../../application/interface/service/i-token-service";



export class AuthUserLoginUseCase {

    constructor(
        private readonly authUserRepository: IAuthUserRepository,
        private readonly tokenService: TokenService
    ){}

    async execute(requestLoginDTO: RequestLoginDTO): Promise<ResponseLoginDTO>{

        const user : any = await this.authUserRepository.findByEmail(requestLoginDTO.email);

        if(!user){
            throw new AppError("User not found", 404);
        }

        const isPasswordValid = await HashPassword.compare(requestLoginDTO.password,user.password);

        if(!isPasswordValid){
            throw new AppError("Invalid password", 401);
        }

        const token = this.tokenService.generate({id: user.id,email: user.email,username: user.username});

        const responseLoginDTO : ResponseLoginDTO = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                create_at: user.create_at as Date
            },
            token: token
        }

        return responseLoginDTO;

    }

}

