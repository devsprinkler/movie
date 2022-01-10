import 'dotenv/config';
import express, {json, Request, Response} from 'express';
import morgan, {StreamOptions} from 'morgan';
import { Config } from './config/config';
import { logger } from './utils/logger/logger';
import router from './routes';
import { ErrorCode } from "./const/errorcode";
import 'reflect-metadata';
import { createConnection } from "typeorm";

const app = express();

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
app.listen(port, async () => {
    logger.info(`Server listening on port ${port}`);
    await createConnection(Config.Env.TypeOrm.MYSQL);
});

export { app };