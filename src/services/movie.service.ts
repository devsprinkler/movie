import axios from "axios";
import { logger } from "../utils/logger/logger";
import { ErrorCode } from '../const/errorcode';
import { MovieEntity } from "../models/entities/movie.entity";
import { getMovieRepository } from "../models/repositories/movie.repository";
import {
    MovieBulkImportRequest, MovieBulkImportResponse,
    MovieGetDetailResponse, MovieGetListResponse,
    MovieImportDetailRequest, MovieImportDetailResponse,
    MovieImportListRequest, MovieImportListResponse,
    MovieSearchResponse
} from "../network/movie.command";
import { UpdateResult } from "typeorm";

export default class Movie {
    private static async dbInsertMovieList
    (list: MovieListApiVo[]): Promise<boolean> {
        try {
            const movieDtoList: MovieDto[] = [];
            for (let movie of list) {
                const movieDto: MovieDto = {
                    movieCd: movie.movieCd,
                    movieNm: movie.movieNm,
                    movieNmEn: movie.movieNmEn,
                    prdtYear: Number(movie.prdtYear),
                    openDt: Number(movie.openDt),
                    typeNm: movie.typeNm,
                    prdtStatNm: movie.prdtStatNm,
                    nationAlt: movie.nationAlt,
                    genreAlt: movie.genreAlt,
                    repNationNm: movie.repNationNm,
                    repGenreNm: movie.repGenreNm,
                    directors: JSON.stringify(movie.directors),
                    companies: JSON.stringify(movie.companys)
                }
                movieDtoList.push(movieDto);
            }
            const movies: MovieEntity[] =
                await getMovieRepository().createMovies(movieDtoList);
        } catch(err) {
            logger.error(err);
            return false;
        }
        return true;
    }

    public static async getList
    (movieCd: string): Promise<MovieGetListResponse> {
        let response: MovieGetListResponse;
        try {
            const list: MovieEntity[] =
                await getMovieRepository().findMovies(movieCd);
            response = {
                status: ErrorCode.OK,
                command: {
                    movies: list
                }
            }
            return response;
        } catch (e) {
            logger.error(`get list failed: ${e}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    movies: []
                }
            };
            return response;
        }
    }

    public static async search(movieNm: string): Promise<MovieSearchResponse> {
        let response: MovieSearchResponse;
        if (movieNm.length < 2) {
            response = {
                status: ErrorCode.INPUT_TOOSHORT,
                command: {
                    movies: []
                }
            };
            return response;
        }
        try {
            const movies: MovieEntity[] =
                await getMovieRepository().findByName(movieNm);
            response = {
                status: ErrorCode.OK,
                command: {
                    movies: movies
                }
            };
            return response;
        } catch (err) {
            logger.error(`movie find by name failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    movies: []
                }
            };
            return response;
        }
    }

    public static async getDetail
    (movieCd: string): Promise<MovieGetDetailResponse> {
        let response: MovieGetDetailResponse;
        try {
            const movie: MovieEntity | undefined =
                await getMovieRepository().getDetail(movieCd);
            if (!movie) {
                response = {
                    status: ErrorCode.CONTENT_NOTFOUND,
                    command: {
                        movie: null
                    }
                }
                return response;
            }
            response = {
                status: ErrorCode.OK,
                command: {
                    movie: movie
                }
            }
            return response;
        } catch (err) {
            logger.error(`get detail failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    movie: null
                }
            };
            return response;
        }
    }

    public static async importList
    (request: MovieImportListRequest): Promise<MovieImportListResponse> {
        let response: MovieImportListResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/movie/searchMovieList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&curPage=${String(request.command.curPage)}`;
        host += `&itemPerPage=${String(request.command.itemPerPage)}`;
        const apiResponse: any = await axios.get(host);
        const list: MovieListApiVo[] =
            apiResponse.data.movieListResult.movieList;
        const inserted: boolean = await this.dbInsertMovieList(list);
        if (!inserted) {
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    message: 'db failed'
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'movie list imported'
            }
        };
        return response;
    }

    public static async bulkImport(): Promise<MovieBulkImportResponse> {
        let response: MovieImportDetailResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/movie/searchMovieList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        const apiResponse: any = await axios.get(host);
        const cnt: number =
            Math.ceil(apiResponse.data.movieListResult.totCnt / 100);
        host += `&itemPerPage=100`;
        for (let i = 1; i <= cnt; i++) {
            console.log(`${i} / ${cnt}`);
            let newHost = host;
            newHost += `&curPage=${i}`;
            const apiResponse: any = await axios.get(newHost);
            const list: MovieListApiVo[] =
                apiResponse.data.movieListResult.movieList;
            const inserted: boolean = await this.dbInsertMovieList(list);
            if (!inserted) {
                response = {
                    status: ErrorCode.DB_QUERY_FAILED,
                    command: {
                        message: 'db failed'
                    }
                };
                return response;
            }
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'movie bulk imported'
            }
        };
        return response;
    }

    public static async importDetail
    (request: MovieImportDetailRequest): Promise<MovieImportDetailResponse> {
        let response: MovieImportDetailResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/movie/searchMovieInfo.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&movieCd=${request.command.movieCd as string}`;
        try {
            const apiResponse: any = await axios.get(host);
            const detail: MovieDetailApiVo =
                apiResponse.data.movieInfoResult.movieInfo;
            const movieDetailDto: MovieDetailDto = {
                movieCd: detail.movieCd,
                movieNmOg: detail.movieNmOg,
                showTm: Number(detail.showTm),
                nations: JSON.stringify(detail.nations),
                genres: JSON.stringify(detail.genres),
                directors: JSON.stringify(detail.directors),
                actors: JSON.stringify(detail.actors),
                companies: JSON.stringify(detail.companys),
                audits: JSON.stringify(detail.audits),
                staffs: JSON.stringify(detail.staffs)
            }
            try {
                const updateRes: UpdateResult =
                    await getMovieRepository().patchDetail(movieDetailDto);
                response = {
                    status: ErrorCode.OK,
                    command: {
                        message: 'succeeded'
                    }
                };
                logger.info(updateRes);
                return response;
            } catch (err) {
                logger.error(`movie detail update failed: ${err}`);
                response = {
                    status: ErrorCode.DB_QUERY_FAILED,
                    command: {
                        message: 'db update failed'
                    }
                };
                return response;
            }
        } catch (err) {
            logger.error(`KOFIC API erorr: ${err}`);
            response = {
                status: ErrorCode.KOFIC_API_ERROR,
                command: {
                    message: 'KOFIC API error'
                }
            };
            return response;
        }
    }
}