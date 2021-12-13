import promiseMysql from "mysql2/promise";
import { SqlResults } from "../utils/database/sql_results";
import { MySql } from "../utils/database/mysql";

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

        response = {
            status: ErrorCode.OK,
            command: {
                movies: []
            }
        };
        return response;
    }
}