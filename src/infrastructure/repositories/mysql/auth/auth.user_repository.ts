import {UserEntity} from "../../../../domain/entities/auth/user.entity";
import {RequestRegisterDTO} from "../../../../application/dto/auth/register/request.register.dto";
import {ResponseRegisterDTO} from "../../../../application/dto/auth/register/response.register.dto";
import {IAuthUserRepository} from "../../../../application/interface/repositories/auth/auth_user.repository.interface";
import {AuthUserRegisterUseCase} from "../../../../application/usecase/auth/auth.user.register.usecase";
import {AppError} from "../../../../application/errors/app-error";
import {Database} from "../../../database/mysql";


const pool = Database.getInstance().getPool();

export class MySQLAuthUserRepository implements IAuthUserRepository {

    async findByEmail(email: string): Promise<UserEntity | null>{

        const [rows] : any = await pool.query('select * from users where email = ?',[email]);

        if(rows.length === 0){
            return null;
        }
        const user = rows[0];

        return new UserEntity(user.id,user.username,user.email,user.password,user.create_at);
        
    }

    async create(requestRegisterDTO: RequestRegisterDTO): Promise<UserEntity>{

        const [result] : any = await pool.query('insert into users (username,email,password) values (?,?,?)',[requestRegisterDTO.username,requestRegisterDTO.email,requestRegisterDTO.password]);

        if(result.affectedRows === 0){
            throw new AppError("Error creating user", 500);
        }

        const [rows] : any = await pool.query('select * from users where id = ?',[result.insertId]);

        if(rows.length === 0){
            throw new AppError("Error creating user", 500);
        }

        const user = rows[0];

        return new UserEntity(user.id,user.username,user.email,null,user.create_at);

    }

    async findById(id: number): Promise<UserEntity | null> {
    
      const [rows] : any = await pool.query('select * from users where id = ?',[id]);

      if(rows.length === 0){
        return null;
      }

      const row = rows[0];

      return new UserEntity(row.id,row.username,row.email,null,row.create_at);

  }

    

}