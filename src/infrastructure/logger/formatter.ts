export function formatLog(
    level: any,
    message: string,
    meta: any
){
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    return {
        date,
        time,
        level: String(level).toUpperCase(),
        message,
        meta: meta || null
    }
}