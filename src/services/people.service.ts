// import promiseMysql from "mysql2/promise";
// import axios from "axios";
// import { logger } from "../utils/logger/logger";
// import { ErrorCode } from '../const/errorcode';
//
// export default class People {
//     private static async dbInsertPeopleList
//     (list: PeopleListApiVo[]): Promise<boolean> {
//         try {
//             for (let people of list) {
//                 if (!people.peopleNmEn) {
//                     people.peopleNmEn = '';
//                 }
//                 if (!people.filmoNames) {
//                     people.filmoNames = '';
//                 }
//                 const sql: string = promiseMysql.format(`
//                         INSERT INTO mymoviedb.tb_people
//                         (people_cd, people_nm, people_nm_en, rep_role_nm,
//                          filmo_names)
//                         VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY
//                         UPDATE filmo_names = ?
//                     `, [
//                     people.peopleCd,
//                     people.peopleNm,
//                     people.peopleNmEn,
//                     people.repRoleNm,
//                     people.filmoNames,
//                     people.filmoNames
//                 ]);
//                 const sqlResults: SqlResults = await MySql.query(sql);
//                 if (sqlResults.code === MySql.Const.FAIL) {
//                     logger.error(`insert failed - ${JSON.stringify(people)}`);
//                     return false;
//                 }
//             }
//         } catch(err) {
//             logger.error(err);
//             return false;
//         }
//         return true;
//     }
//     public static async getList
//     (peopleCd: string): Promise<PeopleGetListResponse> {
//         let response: PeopleGetListResponse;
//         const sql: string = promiseMysql.format(`
//             SELECT people_cd as peopleCd, people_nm as peopleNm,
//             people_nm_en as peopleNmEn, rep_role_nm as repRoleNm,
//             filmo_names as filmoNames
//             FROM mymoviedb.tb_people
//             WHERE people_cd > ?
//             LIMIT 20
//         `, [peopleCd]);
//         const sqlResults: SqlResults = await MySql.query(sql);
//         if (sqlResults.code === MySql.Const.SUCCESS) {
//             const people: PeopleDto[] = sqlResults.data;
//             response = {
//                 status: ErrorCode.OK,
//                 command: {
//                     people: people
//                 }
//             };
//             return response;
//         }
//         response = {
//             status: ErrorCode.DB_QUERY_FAILED,
//             command: {
//                 people: []
//             }
//         };
//         return response;
//     }
//
//     public static async search(peopleNm: string): Promise<PeopleSearchResponse> {
//         let response: PeopleSearchResponse;
//         const sql: string = promiseMysql.format(`
//             SELECT people_cd as peopleCd, people_nm as peopleNm,
//                    people_nm_en as peopleNmEn, rep_role_nm as repRoleNm,
//                    filmo_names as filmoNames
//             FROM mymoviedb.tb_people
//             WHERE people_nm LIKE '%${peopleNm}%' OR people_nm_en LIKE '%${peopleNm}%'
//         `);
//         const sqlResults: SqlResults = await MySql.query(sql);
//         if (sqlResults.code === MySql.Const.SUCCESS) {
//             const people: PeopleDto[] = sqlResults.data;
//             response = {
//                 status: ErrorCode.OK,
//                 command: {
//                     people: people
//                 }
//             };
//             return response;
//         }
//         response = {
//             status: ErrorCode.DB_QUERY_FAILED,
//             command: {
//                 people: []
//             }
//         };
//         return response;
//     }
//
//     public static async getDetail
//     (peopleCd: string): Promise<PeopleGetDetailResponse> {
//         let response: PeopleGetDetailResponse;
//         const sql: string = promiseMysql.format(`
//             SELECT people_cd as peopleCd, people_nm as peopleNm,
//             people_nm_en as peopleNmEn, sex, rep_role_nm as repRoleNm,
//             homepages, filmos
//             FROM mymoviedb.tb_people
//             WHERE people_cd = ?
//             LIMIT 1
//         `, [peopleCd]);
//         const sqlResults: SqlResults = await MySql.query(sql);
//         if (sqlResults.code === MySql.Const.SUCCESS) {
//             const people: PeopleDetailDto = sqlResults.data[0];
//             people.homepages = `${people.homepages}`;
//             people.filmos = `${people.filmos}`;
//             response = {
//                 status: ErrorCode.OK,
//                 command: {
//                     people: people
//                 }
//             };
//             return response;
//         }
//         response = {
//             status: ErrorCode.DB_QUERY_FAILED,
//             command: {
//                 people: null
//             }
//         };
//         return response;
//     }
//
//     public static async importList
//     (request: PeopleImportListRequest): Promise<PeopleImportListResponse> {
//         let response: PeopleImportListResponse;
//         let host: string = process.env.KOFIC_APIHOST as string;
//         host += '/people/searchPeopleList.json';
//         host += `?key=${process.env.KOFIC_APIKEY as string}`;
//         host += `&curPage=${String(request.command.curPage)}`;
//         host += `&itemPerPage=${String(request.command.itemPerPage)}`;
//         const apiResponse: any = await axios.get(host);
//         const list: PeopleListApiVo[] =
//             apiResponse.data.peopleListResult.peopleList;
//         const inserted: boolean = await this.dbInsertPeopleList(list);
//         if (!inserted) {
//             response = {
//                 status: ErrorCode.DB_QUERY_FAILED,
//                 command: {
//                     message: 'db failed'
//                 }
//             };
//             return response;
//         }
//         response = {
//             status: ErrorCode.OK,
//             command: {
//                 message: 'people list imported'
//             }
//         };
//         return response;
//     }
//
//     public static async bulkImport
//     (request: PeopleBulkImportRequest): Promise<PeopleBulkImportResponse> {
//         let response: PeopleImportDetailResponse;
//         let host: string = process.env.KOFIC_APIHOST as string;
//         host += '/people/searchPeopleList.json';
//         host += `?key=${process.env.KOFIC_APIKEY as string}`;
//         const apiResponse: any = await axios.get(host);
//         const cnt: number =
//             Math.ceil(apiResponse.data.peopleListResult.totCnt / 100);
//         host += `&itemPerPage=100`;
//         for (let i = 1; i <= cnt; i++) {
//             console.log(`${i} / ${cnt}`);
//             let newHost = host;
//             newHost += `&curPage=${i}`;
//             const apiResponse: any = await axios.get(newHost);
//             const list: PeopleListApiVo[] =
//                 apiResponse.data.peopleListResult.peopleList;
//             const inserted: boolean = await this.dbInsertPeopleList(list);
//             if (!inserted) {
//                 response = {
//                     status: ErrorCode.DB_QUERY_FAILED,
//                     command: {
//                         message: 'db failed'
//                     }
//                 };
//                 return response;
//             }
//         }
//         response = {
//             status: ErrorCode.OK,
//             command: {
//                 message: 'people bulk imported'
//             }
//         };
//         return response;
//     }
//
//     public static async importDetail
//     (request: PeopleImportDetailRequest): Promise<PeopleImportDetailResponse> {
//         let response: PeopleImportDetailResponse;
//         let host: string = process.env.KOFIC_APIHOST as string;
//         host += '/people/searchPeopleInfo.json';
//         host += `?key=${process.env.KOFIC_APIKEY as string}`;
//         host += `&peopleCd=${request.command.peopleCd as string}`;
//         const apiResponse: any = await axios.get(host);
//         const detail: PeopleDetailApiVo =
//             apiResponse.data.peopleInfoResult.peopleInfo;
//         try {
//             const sql: string = promiseMysql.format(`
//                 UPDATE mymoviedb.tb_people
//                 SET homepages = ?, filmos = ?
//                 WHERE people_cd = ?
//             `, [
//                 JSON.stringify(detail.homepages),
//                 JSON.stringify(detail.filmos),
//                 detail.peopleCd
//             ]);
//             const sqlResults: SqlResults = await MySql.query(sql);
//             if (sqlResults.code === MySql.Const.FAIL) {
//                 logger.error(`insert failed - ${JSON.stringify(detail)}`);
//                 response = {
//                     status: ErrorCode.DB_QUERY_FAILED,
//                     command: {
//                         message: 'db failed'
//                     }
//                 };
//                 return response;
//             }
//         } catch(err) {
//             logger.error(err);
//             response = {
//                 status: ErrorCode.DB_QUERY_FAILED,
//                 command: {
//                     message: 'db failed'
//                 }
//             };
//             return response;
//         }
//         response = {
//             status: ErrorCode.OK,
//             command: {
//                 message: 'people detail imported'
//             }
//         };
//         return response;
//     }
// }