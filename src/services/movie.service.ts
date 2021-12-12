export default class Movie {
    public getList(request: MovieGetListRequest): MovieListResponse {
        let response: MovieListResponse;

        response = {
            status: 200,
            command: {
                movies: []
            }
        };
        return response;
    }

    public search(request: MovieSearchRequest): MovieListResponse {
        let response: MovieListResponse;

        response = {
            status: 200,
            command: {
                movies: []
            }
        };
        return response;
    }
}