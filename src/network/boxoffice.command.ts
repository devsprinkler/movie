export interface BoxOfficeImportResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface BoxOfficeImportRequest extends DefaultRequest {
    command: {
        targetDt: string,       // "yyyymmdd"
        itemPerPage: number     // 1 ~ 10
    }
}

export interface BoxOfficeImportWeeklyResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface BoxOfficeImportWeeklyRequest extends DefaultRequest {
    command: {
        targetDt: string,       // "yyyymmdd"
        weekGb: number,         // 0 (mon~sun), 1 (fri~sun), 2 (mon~thu)
        itemPerPage: number     // 1 ~ 10
    }
}