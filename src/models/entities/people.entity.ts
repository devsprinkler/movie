import {
    Entity, Column, PrimaryColumn, UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('tb_people')
export class PeopleEntity {
    @PrimaryColumn({
        length: 10,
        type: 'varchar',
        name: 'people_cd'
    })
    peopleCd?: string;

    @UpdateDateColumn()
    update_dt?: Date;

    @CreateDateColumn()
    reg_dt?: Date;
}