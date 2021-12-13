import 'dotenv/config';
import express, {json, Request, Response} from 'express';
import morgan, {StreamOptions} from 'morgan';
import mysql from 'mysql2/promise';
import { Config } from './config/config';
import { logger } from './utils/logger/logger';
import router from './routes';
import { ErrorCode } from "./const/errorcode";

export const mysqlPool: mysql.Pool = mysql.createPool(Config.Env.MySql.PROJECT);
export const app = express();

const stream: StreamOptions = {
    // Use the http severity
    write: (message) => logger.http(message),
};
app.use(json());
app.use(morgan("short", { stream }));
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