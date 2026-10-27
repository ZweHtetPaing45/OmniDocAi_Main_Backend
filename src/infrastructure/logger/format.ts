import { ILogger } from "../../application/interface/logging/i-logger";


export class Logger implements ILogger{

    constructor(private transports: any[]){}

    info(message: string, meta?: any): void {
        this.transports.forEach(t => t.log("info",message,meta));
    }

    error(message: string, meta?: any): void {
        this.transports.forEach(t => t.log("error",message,meta));
    }
    
    warn(message: string, meta?: any): void {
        this.transports.forEach(t => t.log("warn",message,meta));
    }

}