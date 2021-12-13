import { Router, Request, Response, NextFunction } from 'express';
import Movie from "../services/movie.service";

const router = Router();

router.get('/list/:movieCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieCd: number = Number(req.params.movieCd);
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
    const movieCd: number = Number(req.params.movieCd);
    const response: MovieGetDetailResponse = await Movie.getDetail(movieCd);
    return res.status(200).json(response);
});

router.post('/import/list',
    async (req: Request, res: Response, next: NextFunction) => {
    const request: MovieImportListRequest = req.body;
    const response: MovieImportListResponse = await Movie.importList(request);
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