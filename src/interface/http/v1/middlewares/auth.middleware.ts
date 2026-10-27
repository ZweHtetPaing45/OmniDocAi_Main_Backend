import {Request,Response,NextFunction} from 'express';
import {AppError} from '../../../../application/errors/app-error';
import { TokenService } from '../../../../application/interface/service/i-token-service';
import {OwnerRepository} from '../../../../application/interface/repositories/owner-repositories/i-owner-repository';


export class AuthMiddleware{

    constructor(
        private tokenService: TokenService,
        private ownerRepository: OwnerRepository
    ){}

    async handle(req: Request,res: Response,next: NextFunction){

        try{

            const authHeader = req.headers.authorization;

            if(!authHeader?.startsWith("Bearer ")) throw new AppError("Token not provided",401);

            const token = authHeader.split(' ')[1];

            const decodedToken : any = await this.tokenService.verify(token);

            if(!decodedToken) throw new AppError("Invalid token",401);

            const owner = await this.ownerRepository.findById(decodedToken.id);
            
            if(!owner) throw new AppError("Owner not found",404);

            (req as any).owner = owner;
            
            console.log("Owner ID from middleware:", owner); // Log the owner ID for debugging

            next();


        }catch(error){
            next(error);
        }

    }

}