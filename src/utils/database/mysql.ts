import { SqlResults } from './sql_results';
import { mysqlPool } from '../../app';
import promiseMysql from 'mysql2/promise';
import { logger } from "../logger/logger";

export class MySql {
    public static Const = class {
        public static readonly SUCCESS: number = 1;
        public static readonly FAIL: number = 0;
    }

    public static async query
    (query: string, params: any[] = []): Promise<SqlResults> {
        try {
            const connection: promiseMysql.PoolConnection =
                await mysqlPool.getConnection();
            try {
                const rows: any[] = await connection.query(query, params);
                connection.release();
                return {
                    code: this.Const.SUCCESS,
                    message: '',
                    data: rows[0]
                };
            } catch (err) {
                logger.error(err);
                connection.release();
                return {
                    code: this.Const.FAIL,
                    message: 'DB_QUERY_FAILED'
                }
            }
        } catch (err) {
            logger.error(err);
            return {
                code: this.Const.FAIL,
                message: 'DB_CONN_FAILED'
            }
        }
    }
}