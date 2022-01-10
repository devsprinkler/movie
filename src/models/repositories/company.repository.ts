import {
    EntityRepository, getConnection, Like, MoreThan,
    Repository, UpdateResult
} from "typeorm";
import { CompanyEntity } from "../entities/company.entity";

export function getCompanyRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(CompanyRepository);
}

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
    async createCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
        const company = this.create(companyDto);
        return await this.save(company);
    }

    async createCompanies(companyDtoList: CompanyDto[]): Promise<CompanyEntity[]> {
        const companies = this.create(companyDtoList);
        return await this.save(companies);
    }

    async findCompanies(companyCd: string): Promise<CompanyEntity[]> {
        return await this.find({
            select: [
                'companyCd', 'companyNm', 'companyNmEn',
                'companyPartNames', 'ceoNm', 'filmoNames'
            ],
            where: { companyCd: MoreThan(companyCd) },
            take: 20
        });
    }

    async findCompanyByName(name: string): Promise<CompanyEntity[]> {
        return await this.find({
           select: [
               'companyCd', 'companyNm', 'companyNmEn',
               'companyPartNames', 'ceoNm', 'filmoNames'
           ],
            where: [
                { companyNm: Like(name) },
                { companyNmEn: Like(name) }
            ],
        });
    }

    async getDetail(companyCd: string): Promise<CompanyEntity | undefined> {
        return await this.findOne({
            select: [
                'companyCd', 'companyNm', 'companyNmEn',
                'ceoNm', 'parts', 'filmos'
            ],
            where: { companyCd: companyCd }
        });
    }

    async patchDetail(companyDetail: CompanyDetailDto): Promise<UpdateResult> {
        return await this.update({
            companyCd: companyDetail.companyCd
        }, {
            parts: companyDetail.parts,
            filmos: companyDetail.filmos
        });
    }
}