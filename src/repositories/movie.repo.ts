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