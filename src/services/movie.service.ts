import promiseMysql from "mysql2/promise";
import { SqlResults } from "../utils/database/sql_results";
import { MySql } from "../utils/database/mysql";
import axios from "axios";
import { logger } from "../utils/logger/logger";
import { ErrorCode } from '../const/errorcode';
import {Connection, createConnection, getConnection} from 'typeorm';
import { Config } from "../config/config";
import { MovieEntity } from "../models/entities/movie.entity";

export default class Movie {
    private static async dbInsertMovieList
    (list: MovieListApiVo[]): Promise<boolean> {
        try {
            for (let movie of list) {
                const sql: string = promiseMysql.format(`
                        INSERT INTO mymoviedb.tb_movies
                        (movie_cd, movie_nm, movie_nm_en, prdt_year, open_dt, type_nm,
                         prdt_stat_nm, nation_alt, genre_alt, rep_nation_nm,
                         rep_genre_nm, directors, companies)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
                        UPDATE open_dt = ?
                    `, [
                    movie.movieCd,
                    movie.movieNm,
                    movie.movieNmEn,
                    Number(movie.prdtYear),
                    Number(movie.openDt),
                    movie.typeNm,
                    movie.prdtStatNm,
                    movie.nationAlt,
                    movie.genreAlt,
                    movie.repNationNm,
                    movie.repGenreNm,
                    JSON.stringify(movie.directors),
                    JSON.stringify(movie.companys),
                    Number(movie.openDt),
                ]);
                const sqlResults: SqlResults = await MySql.query(sql);
                if (sqlResults.code === MySql.Const.FAIL) {
                    logger.error(`insert failed - ${JSON.stringify(movie)}`);
                    return false;
                }
            }
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
            const conn = getConnection();
            const list: MovieEntity[] = await conn
                .getRepository(MovieEntity)
                .createQueryBuilder('tb_movies')
                .select([
                    'tb_movies.movie_cd',
                    'tb_movies.movie_nm',
                    'tb_movies.movie_nm_en',
                    'tb_movies.prdt_year',
                    'tb_movies.open_dt',
                    'tb_movies.type_nm',
                    'tb_movies.prdt_stat_nm',
                    'tb_movies.nation_alt',
                    'tb_movies.genre_alt',
                    'tb_movies.rep_nation_nm',
                    'tb_movies.rep_genre_nm',
                    'tb_movies.directors',
                    'tb_movies.companies'
                ])
                .where(`tb_movies.movie_cd > :movieCd`, { movieCd: movieCd })
                .limit(20)
                .getMany()
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

    public static async _getList
    (movieCd: string): Promise<MovieGetListResponse> {
        let response: MovieGetListResponse;
        const sql: string = promiseMysql.format(`
            SELECT movie_cd as movieCd, movie_nm as movieNm,
            movie_nm_en as movieNmEn, prdt_year as prdtYear,
            open_dt as openDt, type_nm as typeNm,
            prdt_stat_nm as prdtStatNm, nation_alt as nationAlt,
            genre_alt as genreAlt, rep_nation_nm as repNationNm,
            rep_genre_nm as repGenreNm, directors, companies
            FROM mymoviedb.tb_movies
            WHERE movie_cd > ?
            LIMIT 20
        `, [movieCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movies: MovieDto[] = sqlResults.data;
            response = {
                status: ErrorCode.OK,
                command: {
                    movies: movies
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                movies: []
            }
        };
        return response;
    }

    public static async search(movieNm: string): Promise<MovieSearchResponse> {
        let response: MovieSearchResponse;
        const sql: string = promiseMysql.format(`
            SELECT movie_cd as movieCd, movie_nm as movieNm,
            movie_nm_en as movieNmEn, prdt_year as prdtYear,
            open_dt as openDt, type_nm as typeNm,
            prdt_stat_nm as prdtStatNm, nation_alt as nationAlt,
            genre_alt as genreAlt, rep_nation_nm as repNationNm,
            rep_genre_nm as repGenreNm, directors, companies
            FROM mymoviedb.tb_movies
            WHERE movie_nm LIKE '%${movieNm}%' OR movie_nm_en LIKE '%${movieNm}%'
        `);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movies: MovieDto[] = sqlResults.data;
            response = {
                status: ErrorCode.OK,
                command: {
                    movies: movies
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                movies: []
            }
        };
        return response;
    }

    public static async getDetail
    (movieCd: string): Promise<MovieGetDetailResponse> {
        let response: MovieGetDetailResponse;
        const sql: string = promiseMysql.format(`
            SELECT movie_cd as movieCd, movie_nm as movieNm,
            movie_nm_en as movieNmEn, movie_nm_og as movieNmOg,
            prdt_year as prdtYear, show_tm as showTm,
            open_dt as openDt, type_nm as typeNm,
            prdt_stat_nm as prdtStatNm, nations, genres,
            directors, actors, companies, show_types as showTypes,
            audits, staffs
            FROM mymoviedb.tb_movies
            WHERE movie_cd = ?
            LIMIT 1
        `, [movieCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movie: MovieDetailDto = sqlResults.data[0];
            movie.actors = `${movie.actors}`;
            movie.staffs = `${movie.staffs}`;
            response = {
                status: ErrorCode.OK,
                command: {
                    movie: movie
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                movie: null
            }
        };
        return response;
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

    public static async bulkImport
    (request: MovieBulkImportRequest): Promise<MovieBulkImportResponse> {
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
        const apiResponse: any = await axios.get(host);
        const detail: MovieDetailApiVo =
            apiResponse.data.movieInfoResult.movieInfo;
        try {
            const sql: string = promiseMysql.format(`
                UPDATE mymoviedb.tb_movies
                SET movie_nm_og = ?, show_tm = ?, nations = ?, genres = ?,
                directors = ?, actors = ?, companies = ?, audits = ?, staffs = ?
                WHERE movie_cd = ?
            `, [
                detail.movieNmOg,
                Number(detail.showTm),
                JSON.stringify(detail.nations),
                JSON.stringify(detail.genres),
                JSON.stringify(detail.directors),
                JSON.stringify(detail.actors),
                JSON.stringify(detail.companys),
                JSON.stringify(detail.audits),
                JSON.stringify(detail.staffs),
                detail.movieCd
            ]);
            const sqlResults: SqlResults = await MySql.query(sql);
            if (sqlResults.code === MySql.Const.FAIL) {
                logger.error(`insert failed - ${JSON.stringify(detail)}`);
                response = {
                    status: ErrorCode.DB_QUERY_FAILED,
                    command: {
                        message: 'db failed'
                    }
                };
                return response;
            }
        } catch(err) {
            logger.error(err);
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
                message: 'movie detail imported'
            }
        };
        return response;
    }
}