export enum ErrorCode {
    // Network status code
    OK = 200,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,

    // Error code
    DB_CONN_FAILED = 1000,
    DB_QUERY_FAILED = 1001,
    KOFIC_API_ERROR = 1002,
    CONTENT_NOTFOUND = 2000,
    INPUT_TOOSHORT = 2001
}