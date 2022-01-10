// import { Router, Request, Response, NextFunction } from 'express';
// import People from "../services/people.service";
//
// const router = Router();
//
// router.get('/list/:peopleCd',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const peopleCd: string = req.params.peopleCd as string;
//         const response: PeopleGetListResponse = await People.getList(peopleCd);
//         return res.status(200).json(response);
//     });
//
// router.get('/search/:peopleNm',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const peopleNm: string = req.params.peopleNm as string;
//         const response: PeopleSearchResponse = await People.search(peopleNm);
//         return res.status(200).json(response);
//     });
//
// router.get('/detail/:peopleCd',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const peopleCd: string = req.params.peopleCd as string;
//         const response: PeopleGetDetailResponse = await People.getDetail(peopleCd);
//         return res.status(200).json(response);
//     });
//
// router.post('/import/list',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const request: PeopleImportListRequest = req.body;
//         const response: PeopleImportListResponse = await People.importList(request);
//         return res.status(200).json(response);
//     });
//
// router.post('/import/bulk',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const request: PeopleBulkImportRequest = req.body;
//         const response: PeopleBulkImportResponse = await People.bulkImport(request);
//         return res.status(200).json(response);
//     });
//
// router.patch('/import/detail',
//     async (req: Request, res: Response, next: NextFunction) => {
//         const request: PeopleImportDetailRequest = req.body;
//         const response: PeopleImportDetailResponse =
//             await People.importDetail(request);
//         return res.status(200).json(response);
//     });
//
// export default router