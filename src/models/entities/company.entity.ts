import {
    Entity, Column, PrimaryColumn, UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('tb_companies')
export class CompanyEntity {
    @PrimaryColumn({
        length: 8,
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
        length: 1000,
        name: 'company_part_names'
    })
    companyPartNames?: string;

    @Column({
        length: 100,
        type: 'varchar',
        name: 'ceo_nm'
    })
    ceoNm?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    parts?: string | null;

    @Column({
        type: 'varchar',
        name: 'filmo_names',
        length: 2000
    })
    filmoNames?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    filmos?: string | null;

    @UpdateDateColumn()
    update_dt?: Date;

    @CreateDateColumn()
    reg_dt?: Date;
}