import { EnvDev } from './env_dev';

export class Config {
    public static Const = class {
        public static readonly DEV: string = 'development';
        public static readonly TEST: string = 'test';
        public static readonly PROD: string = 'production';
    };

    protected static readonly serverEnv: string = process.env.SERVER_ENV as string;
    // protected static readonly serverName: string = process.env.SERVER_NAME;

    public static get Env(): any {
        if (this.serverEnv === this.Const.DEV) {
            return EnvDev;
        }
        // else if (this.serverEnv === this.Const.TEST) {
        //     return EnvTest;
        // } else if (this.serverEnv === this.Const.PROD) {
        //     return EnvProduction;
        // }
    }
}