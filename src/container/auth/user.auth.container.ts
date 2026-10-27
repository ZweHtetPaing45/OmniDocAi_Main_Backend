import { AuthUserRegisterUseCase } from "../../application/usecase/auth/auth.user.register.usecase";
import { AuthUserController } from "../../interface/http/v1/controller/auth/user.auth.controller";
import { MySQLAuthUserRepository } from "../../infrastructure/repositories/mysql/auth/auth.user_repository";
import { AuthUserLoginUseCase } from "../../application/usecase/auth/auth.user.login.usecase";
import { JwtTokenService } from "../../infrastructure/security/jwt-token-service";
import { AuthMiddleware } from "../../interface/http/v1/middlewares/auth.middleware";

const authUserRepository = new MySQLAuthUserRepository();
const jwtTokenService = new JwtTokenService();

const authUserRegisterUseCase = new AuthUserRegisterUseCase(authUserRepository);
const authUserLoginUseCase = new AuthUserLoginUseCase(authUserRepository, jwtTokenService);

export const authUserControllerContainer = new AuthUserController(authUserRegisterUseCase, authUserLoginUseCase);
export const authMiddlewareContainer = new AuthMiddleware(jwtTokenService, authUserRepository);