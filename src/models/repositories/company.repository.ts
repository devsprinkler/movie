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
}