import { CompanyEntity } from "../models/entities/company.entity";

export interface CompanyGetListResponse extends DefaultResponse {
    command: {
        companies: CompanyEntity[]
    };
}

export interface CompanySearchResponse extends DefaultResponse {
    command: {
        companies: CompanyEntity[]
    };
}

export interface CompanyGetDetailResponse extends DefaultResponse {
    command: {
        company: CompanyEntity | null
    }
}

export interface CompanyImportListResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface CompanyBulkImportResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface CompanyImportDetailResponse extends DefaultResponse {
    command: {
        message: string
    }
}

export interface CompanyImportListRequest extends DefaultRequest {
    command: {
        curPage: number,
        itemPerPage: number
    }
}

export interface CompanyImportDetailRequest extends DefaultRequest {
    command: {
        companyCd: string
    }
}