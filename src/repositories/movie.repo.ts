interface MovieListResponse extends DefaultResponse {
    command: {
        movies: MovieDto[]
    };
}

interface MovieGetListRequest extends DefaultRequest {
    command: {
        movieCd: string
    }
}

interface MovieSearchRequest extends DefaultRequest {
    command: {
        name: string
    };
}