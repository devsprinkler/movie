import mysql from 'mysql2/promise';

export class EnvDev {
    public static readonly Host = class {

    };

    public static readonly MySql = class {
        public static readonly PROJECT: mysql.ConnectionOptions = {
            host: 'localhost',
            port: Number(process.env.MYSQL_PORT),
            user: 'mymoviedbdev',
            password: 'mymoviedb12#$',
            database: 'mymoviedb',
            connectTimeout: 60000,
            multipleStatements: true,
            timezone: "Z",
            connectionLimit: 200
        }
    }
}