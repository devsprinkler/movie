interface CompanyGetListResponse extends DefaultResponse {
    command: {
        companies: CompanyDto[]
    };
}

interface CompanySearchResponse extends DefaultResponse {
    command: {
        companies: CompanyDto[]
    };
}

interface CompanyGetDetailResponse extends DefaultResponse {
    command: {
        company: CompanyDetailDto | null
    }
}

interface CompanyImportListResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface CompanyImportDetailResponse extends DefaultResponse {
    command: {
        message: string
    }
}

interface CompanyImportListRequest extends DefaultRequest {
    command: {
        curPage: number,
        itemPerPage: number
    }
}

interface CompanyImportDetailRequest extends DefaultRequest {
    command: {
        companyCd: string
    }
}