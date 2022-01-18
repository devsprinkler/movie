import { NextFunction, Request, Response, Router } from 'express';
import {
    BoxOfficeImportRequest, BoxOfficeImportResponse, BoxOfficeImportWeeklyRequest, BoxOfficeImportWeeklyResponse
} from "../network/boxoffice.command";
import BoxOffice from "../services/boxoffice.service";

const router = Router();

router.post('/import/daily',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: BoxOfficeImportRequest = req.body;
    const response: BoxOfficeImportResponse = await BoxOffice.import(request);
    return res.status(200).json(response);
});

router.post('/import/weekly',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: BoxOfficeImportWeeklyRequest = req.body;
    const response: BoxOfficeImportWeeklyResponse =
        await BoxOffice.importWeekly(request);
    return res.status(200).json(response);
});

router.get('/daily',
    (req: Request, res: Response, next: NextFunction) => {
    // todo: impl
});

router.get('/weekly',
    (req: Request, res: Response, next: NextFunction) => {
   // todo: impl
});

export default router;