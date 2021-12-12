import 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { logger } from './utils/logger';

const app = express();
app.use(morgan('short'));
const port: number = Number(process.env.PORT);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});