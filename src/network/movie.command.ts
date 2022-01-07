import { MovieEntity } from "../models/entities/movie.entity";

export interface MovieGetListResponse extends DefaultResponse {
    command: {
        movies: MovieEntity[]
    };
}

export interface MovieSearchResponse extends DefaultResponse {
    command: {
        movies: MovieEntity[]
    };
}

export interface MovieGetDetailResponse extends DefaultResponse {
    command: {
        movie: MovieEntity | null
    }
}

export interface MovieImportListResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface MovieBulkImportResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface MovieImportDetailResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface MovieImportListRequest extends DefaultRequest {
    command: {
        curPage: number,
        itemPerPage: number
    }
}

export interface MovieBulkImportRequest extends DefaultRequest {
    command: {}
}

export interface MovieImportDetailRequest extends DefaultRequest {
    command: {
        movieCd: string
    }
}

// interface MovieGetListRequest extends DefaultRequest {
//     command: {
//         movieCd: string
//     }
// }
//
// interface MovieSearchRequest extends DefaultRequest {
//     command: {
//         movieNm: string
//     };
// }