import promiseMysql from "mysql2/promise";
import { SqlResults } from "../utils/database/sql_results";
import { MySql } from "../utils/database/mysql";
import axios from "axios";

export default class Movie {
    public static async getList
    (movieCd: number): Promise<MovieGetListResponse> {
        let response: MovieGetListResponse;
        const sql: string = promiseMysql.format(`
            SELECT movie_cd as movieCd, movie_nm as movieNm,
            movie_nm_en as movieNmEn, prdt_year as prdtYear,
            open_dt as openDt, type_nm as typeNm,
            prdt_stat_nm as prdtStatNm, nation_alt as nationAlt,
            genre_alt as genreAlt, rep_nation_nm as repNationNm,
            rep_genre_nm as repGenreNm, directors, companies
            FROM mymoviedb.tb_movie
            WHERE movie_cd < ?
            LIMIT 20
        `, [movieCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movies: MovieDto[] = sqlResults.data[0];
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
            FROM mymoviedb.tb_movie
            WHERE movie_nm LIKE %${movieNm}% OR movie_nm_en LIKE %${movieNm}%
        `);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movies: MovieDto[] = sqlResults.data[0];
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
    (movieCd: number): Promise<MovieGetDetailResponse> {
        let response: MovieGetDetailResponse;
        const sql: string = promiseMysql.format(`
            SELECT movie_cd as movieCd, movie_nm as movieNm,
            movie_nm_en as movieNmEn, movie_nm_og as movieNmOg,
            prdt_year as prdtYear, show_tm as showTm,
            open_dt as openDt, type_nm as typeNm,
            prdt_stat_nm as prdtStatNm, nations, genres,
            directors, actors, companies, show_types as showTypes,
            audits, staffs
            FROM mymoviedb.tb_movie
            WHERE movie_cd = ?
            LIMIT 1
        `, [movieCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const movie: MovieDetailDto[] = sqlResults.data[0];
            response = {
                status: ErrorCode.OK,
                command: {
                    movie: movie[0]
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
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/movie/searchMovieList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&curPage=${String(request.command.curPage)}`;
        host += `&itemPerPage=${String(request.command.itemPerPage)}`;
        const apiResponse: string = await axios.get(host);


        let response: MovieImportListResponse;
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                message: 'db failed'
            }
        };
        return response;
    }

    public static async importDetail
    (request: MovieImportDetailRequest): Promise<MovieImportDetailResponse> {
        let response: MovieImportDetailResponse;
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                message: 'db failed'
            }
        };
        return response;
    }
}