import chalk from 'chalk';
import { formatLog } from '../formatter';

export class ConsoleTransport{
    log(level: any,message: string,meta?: any){

        const log = formatLog(level,message,meta);

        const text = `[${log.date}] ${log.time}] [${log.level}] ${log.message}`;

        switch(level){
            case "info": console.log(chalk.blue(text)); break;
            case "error": console.log(chalk.red(text)); break;
            case "warn": console.log(chalk.yellow(text)); break;
            default: console.log(text);
        }

    }
}