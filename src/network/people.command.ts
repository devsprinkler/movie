interface PeopleGetListResponse extends DefaultResponse {
    command: {
        people: PeopleDto[]
    };
}

interface PeopleSearchResponse extends DefaultResponse {
    command: {
        people: PeopleDto[]
    };
}

interface PeopleGetDetailResponse extends DefaultResponse {
    command: {
        people: PeopleDetailDto | null
    }
}

interface PeopleImportListResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface PeopleBulkImportResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface PeopleImportDetailResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface PeopleImportListRequest extends DefaultRequest {
    command: {
        curPage: number,
        itemPerPage: number
    }
}

interface PeopleBulkImportRequest extends DefaultRequest {
    command: {}
}

interface PeopleImportDetailRequest extends DefaultRequest {
    command: {
        peopleCd: string
    }
}