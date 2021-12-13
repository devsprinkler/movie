import { Router, Request, Response, NextFunction } from 'express';
import Movie from "../services/movie.service";

const router = Router();

router.get('/list/:movieCd',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieCd: number = Number(req.param('movieCd') as string);
    const response: MovieGetListResponse = await Movie.getList(movieCd);
    return res.status(200).json(response);
});

router.get('/search/:movieNm',
    async (req: Request, res: Response, next: NextFunction) => {
    const movieNm: string = req.param('movieNm') as string;
    const response: MovieSearchResponse = await Movie.search(movieNm);
    return res.status(200).json(response);
});

export default router