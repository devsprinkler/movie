enum ErrorCode {
    // Network status code
    OK = 200,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,

    // Error code
    DB_CONN_FAILED = 1000,
    DB_QUERY_FAILED = 1001,
    CONTENT_NOTFOUND = 2000,
}