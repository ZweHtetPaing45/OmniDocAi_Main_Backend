import { FileTransport } from "./file-transport";

export class InfoFileTransport extends FileTransport{

    log(level: any,message: string,meta?: any){
        if(level !== "info") return;

        super.log(level,message,meta);
    }

}