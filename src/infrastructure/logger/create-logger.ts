import { Logger } from "./format";
import { ConsoleTransport } from "./transports/console-transport";
import { InfoFileTransport } from "./transports/intofile-transport";
import { ErrorFileTransport } from "./transports/errorfile-transport";

export function createLogger(){

    return new Logger([new ConsoleTransport(),new InfoFileTransport("logs/info.log"),new ErrorFileTransport("logs/error.log")]);

}