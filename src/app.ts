import 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { logger } from './utils/logger';
import router from './routes';

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