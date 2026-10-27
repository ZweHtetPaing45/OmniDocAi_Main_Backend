import {Request,Response,NextFunction} from 'express';
import {AppError} from '../../../../application/errors/app-error';
import { TokenService } from '../../../../application/interface/service/i-token-service';
import {IAuthUserRepository} from '../../../../application/interface/repositories/auth/auth_user.repository.interface';


export class AuthMiddleware{

    constructor(
        private tokenService: TokenService,
        private userRepository: IAuthUserRepository
    ){}

    async handle(req: Request,res: Response,next: NextFunction){

        try{

            const authHeader = req.headers.authorization;

            if(!authHeader?.startsWith("Bearer ")) throw new AppError("Token not provided",401);

            const token = authHeader.split(' ')[1];

            const decodedToken : any = await this.tokenService.verify(token);

            if(!decodedToken) throw new AppError("Invalid token",401);

            const user = await this.userRepository.findById(decodedToken.id);
            
            if(!user) throw new AppError("Owner not found",404);

            (req as any).user = user;
            
            // console.log("Owner ID from middleware:", user); // Log the owner ID for debugging

            next();


        }catch(error){
            next(error);
        }

    }

}