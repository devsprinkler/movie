import { Router, Request, Response, NextFunction } from 'express';
import Movie from "../services/movie.service";
import {
    MovieBulkImportRequest, MovieBulkImportResponse,
    MovieGetDetailResponse,
    MovieGetListResponse, MovieImportDetailRequest, MovieImportDetailResponse,
    MovieImportListRequest, MovieImportListResponse,
    MovieSearchResponse
} from "../network/movie.command";

const router = Router();

router.get('/list/:movieCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieCd: string = req.params.movieCd as string;
    const response: MovieGetListResponse = await Movie.getList(movieCd);
    return res.status(200).json(response);
});

router.get('/search/:movieNm',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieNm: string = req.params.movieNm as string;
    const response: MovieSearchResponse = await Movie.search(movieNm);
    return res.status(200).json(response);
});

router.get('/detail/:movieCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieCd: string = req.params.movieCd as string;
    const response: MovieGetDetailResponse = await Movie.getDetail(movieCd);
    return res.status(200).json(response);
});

router.post('/import/list',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: MovieImportListRequest = req.body;
    const response: MovieImportListResponse = await Movie.importList(request);
    return res.status(200).json(response);
});

router.post('/import/bulk',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: MovieBulkImportRequest = req.body;
    const response: MovieBulkImportResponse = await Movie.bulkImport(request);
    return res.status(200).json(response);
});

router.patch('/import/detail',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: MovieImportDetailRequest = req.body;
    const response: MovieImportDetailResponse =
        await Movie.importDetail(request);
    return res.status(200).json(response);
});

export default router