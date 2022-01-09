import promiseMysql from "mysql2/promise";
import axios from "axios";
import { logger } from "../utils/logger/logger";
import { ErrorCode } from '../const/errorcode';

export default class Company {
    private static async dbInsertCompanyList
    (list: CompanyListApiVo[]): Promise<boolean> {
        try {
            for (let company of list) {
                const sql: string = promiseMysql.format(`
                    INSERT INTO mymoviedb.tb_companies
                    (company_cd, company_nm, company_nm_en, company_part_names,
                     ceo_nm, filmo_names)
                    VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
                    UPDATE company_part_names = ?, ceo_nm = ?, filmo_names = ?
                `, [
                    company.companyCd,
                    company.companyNm,
                    company.companyNmEn,
                    company.companyPartNames,
                    company.ceoNm,
                    company.filmoNames,
                    company.companyPartNames,
                    company.ceoNm,
                    company.filmoNames
                ]);
                const sqlResults: SqlResults = await MySql.query(sql);
                if (sqlResults.code === MySql.Const.FAIL) {
                    logger.error(`insert failed - ${JSON.stringify(company)}`);
                    return false;
                }
            }
        } catch(err) {
            logger.error(err);
            return false;
        }
        return true;
    }

    public static async getList
    (companyCd: string): Promise<CompanyGetListResponse> {
        let response: CompanyGetListResponse;
        const sql: string = promiseMysql.format(`
            SELECT company_cd as companyCd, company_nm as companyNm,
            company_nm_en as companyNmEn,
            company_part_names as companyPartNames, ceo_nm as ceoNm,
            filmo_names as filmoNames
            FROM mymoviedb.tb_companies
            WHERE company_cd > ?
            LIMIT 20
        `, [companyCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const companies: CompanyDto[] = sqlResults.data;
            response = {
                status: ErrorCode.OK,
                command: {
                    companies: companies
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                companies: []
            }
        };
        return response;
    }

    public static async search(companyNm: string): Promise<CompanySearchResponse> {
        let response: CompanySearchResponse;
        const sql: string = promiseMysql.format(`
            SELECT company_cd as companyCd, company_nm as companyNm,
            company_nm_en as companyNmEn,
            company_part_names as companyPartNames, ceo_nm as ceoNm,
            filmo_names as filmoNames
            FROM mymoviedb.tb_companies
            WHERE company_nm LIKE '%${companyNm}%' OR company_nm_en LIKE '%${companyNm}%'
        `);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const companies: CompanyDto[] = sqlResults.data;
            response = {
                status: ErrorCode.OK,
                command: {
                    companies: companies
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                companies: []
            }
        };
        return response;
    }

    public static async getDetail
    (companyCd: string): Promise<CompanyGetDetailResponse> {
        let response: CompanyGetDetailResponse;
        const sql: string = promiseMysql.format(`
            SELECT company_cd as companyCd, company_nm as companyNm,
                   company_nm_en as companyNmEn,
                   company_part_names as companyPartNames, ceo_nm as ceoNm,
                   parts, filmos
            FROM mymoviedb.tb_companies
            WHERE company_cd = ?
            LIMIT 1
        `, [companyCd]);
        const sqlResults: SqlResults = await MySql.query(sql);
        if (sqlResults.code === MySql.Const.SUCCESS) {
            const company: CompanyDetailDto = sqlResults.data[0];
            company.parts = `${company.parts}`;
            company.filmos = `${company.filmos}`;
            response = {
                status: ErrorCode.OK,
                command: {
                    company: company
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.DB_QUERY_FAILED,
            command: {
                company: null
            }
        };
        return response;
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
                    message: 'db failed'
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'movie list imported'
            }
        };
        return response;
    }

    public static async bulkImport
    (request: CompanyBulkImportRequest): Promise<CompanyBulkImportResponse> {
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
                        message: 'db failed'
                    }
                };
                return response;
            }
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'movie list imported'
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
        const detail: CompanyDetailApiVo =
            apiResponse.data.companyInfoResult.companyInfo;
        try {
            const sql: string = promiseMysql.format(`
                UPDATE mymoviedb.tb_companies
                SET parts = ?, filmos = ?
                WHERE company_cd = ?
            `, [
                JSON.stringify(detail.parts),
                JSON.stringify(detail.filmos),
                detail.companyCd
            ]);
            const sqlResults: SqlResults = await MySql.query(sql);
            if (sqlResults.code === MySql.Const.FAIL) {
                logger.error(`insert failed - ${JSON.stringify(detail)}`);
                response = {
                    status: ErrorCode.DB_QUERY_FAILED,
                    command: {
                        message: 'db failed'
                    }
                };
                return response;
            }
        } catch(err) {
            logger.error(err);
            response = {
                status: ErrorCode.DB_QUERY_FAILED,
                command: {
                    message: 'db failed'
                }
            };
            return response;
        }
        response = {
            status: ErrorCode.OK,
            command: {
                message: 'movie detail imported'
            }
        };
        return response;
    }
}