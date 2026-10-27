import mysql from 'mysql2/promise';
import { env } from '../../config/env';

// export const pool = mysql.createPool({
//     host: env.HOST,
//     user: env.USER,
//     password: env.PASSWORD,
//     database: env.NAME
// });


export class Database{

    private static instance : Database;

    private pool;

    private constructor(){
        this.pool = mysql.createPool({
        host: env.HOST,
        user: env.USER,
        password: env.PASSWORD,
        database: env.NAME
});
    }

    public static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public getPool(){
        return this.pool;
    }

}