import axios from 'axios';
import { logger } from "../utils/logger/logger";
import { ErrorCode } from '../const/errorcode';
import {
    BoxOfficeImportRequest, BoxOfficeImportResponse,
    BoxOfficeImportWeeklyRequest, BoxOfficeImportWeeklyResponse
} from "../network/boxoffice.command";

export default class BoxOffice {
    public static async import
    (request: BoxOfficeImportRequest): Promise<BoxOfficeImportResponse> {
        let response: BoxOfficeImportResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/boxoffice/searchDailyBoxOfficeList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&targetDt=${String(request.command.targetDt)}`;
        host += `&itemPerPage=${String(request.command.itemPerPage)}`;
        const apiResponse: any = await axios.get(host);
        // todo: impl DB insert
        return response
    }

    public static async importWeekly(request: BoxOfficeImportWeeklyRequest)
        : Promise<BoxOfficeImportWeeklyResponse> {
        let response: BoxOfficeImportWeeklyResponse;
        let host: string = process.env.KOFIC_APIHOST as string;
        host += '/boxoffice/searchWeeklyBoxOfficeList.json';
        host += `?key=${process.env.KOFIC_APIKEY as string}`;
        host += `&targetDt=${String(request.command.targetDt)}`;
        host += `&weekGb=${String(request.command.weekGb)}`;
        host += `&itemPerPage=${String(request.command.itemPerPage)}`;
        const apiResponse: any = await axios.get(host);
        // todo: impl DB insert
        return response
    }
}