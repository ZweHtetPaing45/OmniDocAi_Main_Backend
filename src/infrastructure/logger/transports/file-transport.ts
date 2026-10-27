import fs from 'fs';
import { formatLog } from '../formatter';

export class FileTransport {

    constructor(
        private filePath: string
    ){}


    log(level: any,message: string,meta?: any){
        const log = formatLog(level,message,meta);

        fs.appendFileSync(this.filePath,JSON.stringify(log)+ '\n');
    }

}