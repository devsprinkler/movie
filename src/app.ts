import 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import mysql from 'mysql2/promise';
import { Config } from './config/config';
import { logger } from './utils/logger/logger';
import router from './routes';

export const mysqlPool: mysql.Pool = mysql.createPool(Config.Env.MySql.PROJECT);
export const app = express();
app.use(morgan('short'));
app.use(router);

// health check
app.get('/healthy', (req: Request, res: Response) => {
    const response: DefaultResponse = {
        status: ErrorCode.OK,
        command: {}
    };
    return res.status(200).json(response);
});

const port: number = Number(process.env.PORT);
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});