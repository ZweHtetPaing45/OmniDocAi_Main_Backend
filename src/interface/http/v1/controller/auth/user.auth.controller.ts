import { Request,Response,NextFunction } from "express";
import { AuthUserRegisterUseCase } from "../../../../../application/usecase/auth/auth.user.register.usecase";
import { AppError } from "../../../../../application/errors/app-error";
import { RequestRegisterDTO } from "../../../../../application/dto/auth/register/request.register.dto";
import { ResponseRegisterDTO } from "../../../../../application/dto/auth/register/response.register.dto";
import { RequestLoginDTO } from "../../../../../application/dto/auth/login/request.login.dto";
import { ResponseLoginDTO } from "../../../../../application/dto/auth/login/response.login.dto";
import { AuthUserLoginUseCase } from "../../../../../application/usecase/auth/auth.user.login.usecase";


export class AuthUserController {

    constructor(
        private readonly authUserRegisterUseCase: AuthUserRegisterUseCase,
        private readonly authUserLoginUseCase: AuthUserLoginUseCase
    ){}


    async register(req: Request,res: Response,next: NextFunction) {

        try{

            const {username,email,password} = req.body;

            if(!username || !email || !password){
                throw new AppError("Missing required fields", 400);
            }

            const requestRegisterDTO : RequestRegisterDTO = {
                username,
                email,
                password
            };

            const data = await this.authUserRegisterUseCase.execute(requestRegisterDTO);

            const responseRegisterDTO : ResponseRegisterDTO = {
                id: data.id,
                username: data.username,
                email: data.email,
                create_at: data.create_at as Date
            };

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: responseRegisterDTO
            })

        }catch(error){
            next(error);
        }

    }

    async login(req: Request,res: Response,next: NextFunction){
        
        try{

            const {email,password} = req.body;

            if(!email || !password){
                throw new AppError("Missing required fields", 400);
            }

            const requestLoginDTO : RequestLoginDTO = {
                email,
                password
            }
            
            const responseLoginDTO : ResponseLoginDTO = await this.authUserLoginUseCase.execute(requestLoginDTO);

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: responseLoginDTO
            });

        }catch(error){
            next(error);
        }

    }

}