import { Router, Request, Response, NextFunction } from 'express';
import Company from "../services/company.service";

const router = Router();

router.get('/list/:companyCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const companyCd: string = req.params.companyCd as string;
    const response: CompanyGetListResponse = await Company.getList(companyCd);
    return res.status(200).json(response);
});

router.get('/search/:companyNm',
    async (req: Request, res: Response, next: NextFunction) => {
    const companyNm: string = req.params.companyNm as string;
    const response: CompanySearchResponse = await Company.search(companyNm);
    return res.status(200).json(response);
});

router.get('/detail/:companyCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const companyCd: string = req.params.companyCd as string;
    const response: CompanyGetDetailResponse =
        await Company.getDetail(companyCd);
    return res.status(200).json(response);
});

router.post('/import/list',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: CompanyImportListRequest = req.body;
    const response: CompanyImportListResponse =
        await Company.importList(request);
    return res.status(200).json(response);
});

router.post('/import/bulk',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: CompanyBulkImportRequest = req.body;
    const response: CompanyBulkImportResponse =
        await Company.bulkImport(request);
    return res.status(200).json(response);
});

router.patch('/import/detail',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: CompanyImportDetailRequest = req.body;
    const response: CompanyImportDetailResponse =
        await Company.importDetail(request);
    return res.status(200).json(response);
});

export default router