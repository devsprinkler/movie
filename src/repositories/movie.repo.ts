interface MovieGetListResponse extends DefaultResponse {
    command: {
        movies: MovieDto[]
    };
}

interface MovieSearchResponse extends DefaultResponse {
    command: {
        movies: MovieDto[]
    };
}

interface MovieGetDetailResponse extends DefaultResponse {
    command: {
        movie: MovieDetailDto | null
    }
}

interface MovieImportListResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface MovieImportDetailResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface MovieImportListRequest extends DefaultRequest {
    command: {
        curPage: number,
        itemPerPage: number
    }
}

interface MovieImportDetailRequest extends DefaultRequest {
    command: {
        movieCd: number
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