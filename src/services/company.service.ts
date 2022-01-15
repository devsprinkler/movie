import axios from "axios";
import { logger } from "../utils/logger/logger";
import { ErrorCode } from '../const/errorcode';
import { getCompanyRepository } from "../models/repositories/company.repository";
import { CompanyEntity } from "../models/entities/company.entity";
import {
    CompanyBulkImportResponse, CompanyGetDetailResponse,
    CompanyGetListResponse, CompanyImportDetailRequest,
    CompanyImportDetailResponse, CompanyImportListRequest,
    CompanyImportListResponse, CompanySearchResponse
} from "../network/company.command";
import { UpdateResult } from "typeorm";

export default class Company {
    private static async dbInsertCompanyList
    (list: CompanyListApiVo[]): Promise<boolean> {
        try {
            const res: CompanyEntity[] =
                await getCompanyRepository().createCompanies(list);
            logger.info(res);
            return true;
        } catch(err) {
            logger.error(`Company create failed: ${err}`);
            return false;
        }
    }

    public static async getList
    (companyCd: string): Promise<CompanyGetListResponse> {
        let response: CompanyGetListResponse;
        try {
            const companies: CompanyEntity[] =
                await getCompanyRepository().findCompanies(companyCd);
            response = {
                status: ErrorCode.OK,
                command: {
                    companies: companies
                }
            };
            return response;
        } catch (err) {
            logger.error(`Company find failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    companies: []
                }
            };
            return response;
        }
    }

    public static async search(companyNm: string): Promise<CompanySearchResponse> {
        let response: CompanySearchResponse;
        try {
            const companies: CompanyEntity[] =
                await getCompanyRepository().findCompanyByName(companyNm);
            response = {
                status: ErrorCode.OK,
                command: {
                    companies: companies
                }
            };
            return response;
        } catch (err) {
            logger.error(`Company search failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    companies: []
                }
            };
            return response;
        }
    }

    public static async getDetail
    (companyCd: string): Promise<CompanyGetDetailResponse> {
        let response: CompanyGetDetailResponse;
        try {
            const company: CompanyEntity | undefined =
                await getCompanyRepository().getDetail(companyCd);
            if (!company) {
                response = {
                    status: ErrorCode.CONTENT_NOTFOUND,
                    command: {
                        company: null
                    }
                }
                return response;
            }
            response = {
                status: ErrorCode.OK,
                command: {
                    company: company
                }
            };
            return response;
        } catch (err) {
            logger.error(`Find company failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    company: null
                }
            };
            return response;
        }
    }

    public static async importList
    (request: CompanyImportListRequest): Promise<CompanyImportListResponse> {
        let response: CompanyImportListResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/company/searchCompanyList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&curPage=${String(request.command.curPage)}`;
        host += `&itemPerPage=${String(request.command.itemPerPage)}`;
        const apiResponse: any = await axios.get(host);
        const list: CompanyListApiVo[] =
            apiResponse.data.companyListResult.companyList;
        const inserted: boolean = await this.dbInsertCompanyList(list);
        if (!inserted) {
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    message: 'DB failed'
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'Movie list imported'
            }
        };
        return response;
    }

    public static async bulkImport(): Promise<CompanyBulkImportResponse> {
        let response: CompanyBulkImportResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/company/searchCompanyList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&itemPerPage=100`;
        const apiResponse: any = await axios.get(host);
        const cnt: number =
            Math.ceil(apiResponse.data.companyListResult.totCnt / 100);
        for (let i = 1; i <= cnt; i++) {
            console.log(`${i} / ${cnt}`);
            let newHost = host;
            newHost += `&curPage=${i}`;
            const apiResponse: any = await axios.get(newHost);
            const list: CompanyListApiVo[] =
                apiResponse.data.companyListResult.companyList;
            const inserted: boolean = await this.dbInsertCompanyList(list);
            if (!inserted) {
                response = {
                    status: ErrorCode.DB_QUERY_FAILED,
                    command: {
                        message: 'DB failed'
                    }
                };
                return response;
            }
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'Movie list imported'
            }
        };
        return response;
    }

    public static async importDetail
    (request: CompanyImportDetailRequest): Promise<CompanyImportDetailResponse> {
        let response: CompanyImportDetailResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/company/searchCompanyInfo.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&companyCd=${request.command.companyCd as string}`;
        const apiResponse: any = await axios.get(host);
        const detail: CompanyDetailApiVo | undefined =
            apiResponse.data.companyInfoResult.companyInfo;
        if (!detail) {
            response = {
                status: ErrorCode.CONTENT_NOTFOUND,
                command: {
                    message: 'Detail not found'
                }
            };
            return response;
        }
        const detailDto: CompanyDetailDto = {
            companyCd: detail.companyCd,
            companyNm: detail.companyNm,
            companyNmEn: detail.companyNmEn,
            ceoNm: detail.ceoNm,
            parts: JSON.stringify(detail.parts),
            filmos: JSON.stringify(detail.filmos)
        }
        try {
            const updated: UpdateResult =
                await getCompanyRepository().patchDetail(detailDto);
            logger.info(updated);
            response = {
                status: ErrorCode.OK,
                command: {
                    message: 'Succeeded'
                }
            };
            return response;
        } catch(err) {
            logger.error(`Company update failed: ${err}`);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    message: 'DB failed'
                }
            };
            return response;
        }
    }
}