import mysql from 'mysql2/promise';
import { ConnectionOptions } from 'typeorm';
import { MovieEntity } from '../models/entities/movie.entity';

export class EnvDev {
    public static readonly Host = class {

    };

    public static readonly TypeOrm = class {
        public static readonly MYSQL: ConnectionOptions = {
            type: 'mysql',
            host: 'localhost',
            port: Number(process.env.MYSQL_PORT),
            username: 'mymoviedbdev',
            password: 'mymoviedb12#$',
            database: 'mymoviedb',
            entities: [
                MovieEntity
            ],
            synchronize: true,
            logging: false
        }
    }
}