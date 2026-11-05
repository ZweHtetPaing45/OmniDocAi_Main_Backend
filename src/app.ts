import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin : 'http://localhost:8081',
    credentials: true,
    methods: ['GET','POST','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
}))


export default app;