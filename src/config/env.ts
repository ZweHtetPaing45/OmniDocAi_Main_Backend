import dotenv from 'dotenv';

dotenv.config();

export const env = {
    HOST: process.env.DB_HOST,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 5000,
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    SECRET: process.env.JWT_SECRET as string,
    EXPIRESIN: process.env.EXPIRESIN as any,
    NODE_ENV: process.env.NODE_ENV as string,
    PDF_SERVICE_URL: process.env.PDF_SERVICE_URL,
    //OCR_SERVICE_URL: process.env.OCR_SERVICE_URL,
    //VOICE_SERVICE_URL: process.env.VOICE_SERVICE_URL
}