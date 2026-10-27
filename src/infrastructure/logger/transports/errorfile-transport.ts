import { FileTransport } from "./file-transport";

export class ErrorFileTransport extends FileTransport{

    log(level: any,message: string,meta?: any){
        if(level !== "error") return;
        super.log(level,message,meta);
    }

}