import {
    EntityRepository, getConnection, Like, MoreThan,
    Repository, UpdateResult
} from "typeorm";
import { MovieEntity } from "../entities/movie.entity";

export function getMovieRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(MovieRepository);
}

@EntityRepository(MovieEntity)
export class MovieRepository extends Repository<MovieEntity> {
    async createMovie(movieDto: MovieDto): Promise<MovieEntity> {
        const movie = this.create(movieDto);
        return await this.save(movie);
    }

    async createMovies(movieDtoList: MovieDto[]): Promise<MovieEntity[]> {
        const movies = this.create(movieDtoList);
        return await this.save(movies);
    }

    async findMovies(movieCd: string): Promise<MovieEntity[]> {
        return await this.find({
            select: [
                'movieCd', 'movieNm', 'movieNmEn', 'prdtYear',
                'openDt', 'typeNm', 'prdtStatNm', 'nationAlt',
                'genreAlt', 'repNationNm', 'repGenreNm', 'directors',
                'companies'
            ],
            where: { movieCd: MoreThan(movieCd) },
            take: 20
        });
    }

    async findByName(movieNm: string): Promise<MovieEntity[]> {
        return await this.find({
            select: [
                'movieCd', 'movieNm', 'movieNmEn', 'prdtYear',
                'openDt', 'typeNm', 'prdtStatNm', 'nationAlt',
                'genreAlt', 'repNationNm', 'repGenreNm', 'directors',
                'companies'
            ],
            where: [ { movieNm: Like(movieNm) }, { movieNmEn: Like(movieNm) } ]
        });
    }

    async getDetail(movieCd: string): Promise<MovieEntity | undefined> {
        return await this.findOne({
            select: [
                'movieCd', 'movieNm', 'movieNmEn', 'movieNmOg',
                'prdtYear', 'showTm', 'openDt', 'typeNm', 'prdtStatNm',
                'nations', 'genres', 'directors', 'actors', 'companies',
                'showTypes', 'audits', 'staffs'
            ],
            where: [ { movieCd: movieCd } ]
        });
    }

    async patchDetail(movieDetail: MovieDetailDto): Promise<UpdateResult> {
        return await this.update({
            movieCd: movieDetail.movieCd
        }, {
            movieNmOg: movieDetail.movieNmOg,
            showTm: movieDetail.showTm,
            nations: movieDetail.nations,
            genres: movieDetail.genres,
            directors: movieDetail.directors,
            actors: movieDetail.actors,
            companies: movieDetail.companies,
            audits: movieDetail.audits,
            staffs: movieDetail.staffs
        });
    }
}