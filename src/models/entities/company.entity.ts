import {
    Entity, Column, PrimaryColumn, UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('tb_companies')
export class CompanyEntity {
    @PrimaryColumn({
        length: 10,
        type: 'varchar',
        name: 'company_cd'
    })
    companyCd?: string;

    @Column({
        length: 200,
        type: 'varchar',
        name: 'company_nm'
    })
    companyNm?: string;

    @Column({
        length: 200,
        type: 'varchar',
        name: 'company_nm_en'
    })
    companyNmEn?: string;

    @Column({
        type: 'varchar',
        length: 200,
        name: 'company_part_names'
    })
    companyPartNames?: string;

    @Column({
        length: 200,
        type: 'varchar',
        name: 'ceo_nm'
    })
    ceoNm?: string;

    @Column({
        type: 'varchar',
        name: 'filmo_names',
        length: 2000
    })
    filmoNames?: string;

    @UpdateDateColumn()
    update_dt?: Date;

    @CreateDateColumn()
    reg_dt?: Date;
}