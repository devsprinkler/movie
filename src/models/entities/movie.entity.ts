import {
    Entity, Column, PrimaryColumn, UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('tb_movies')
export class MovieEntity {
    @PrimaryColumn({
        length: 10,
        type: 'varchar',
        name: 'movie_cd'
    })
    movieCd?: string;

    @Column({
        length: 200,
        type: 'varchar',
        name: 'movie_nm'
    })
    movieNm?: string;

    @Column({
        length: 200,
        type: 'varchar',
        name: 'movie_nm_en'
    })
    movieNmEn?: string;

    @Column({
        length: 100,
        type: 'varchar',
        default: '',
        name: 'movie_nm_og'
    })
    movieNmOg?: string;

    @Column({
        type: 'int',
        name: 'prdt_year'
    })
    prdtYear?: number;

    @Column({
        default: 0,
        type: 'int',
        name: 'show_tm'
    })
    showTm?: number;

    @Column({
        type: 'int',
        name: 'open_dt'
    })
    openDt?: number;

    @Column({
        length: 50,
        type: 'varchar',
        name: 'type_nm'
    })
    typeNm?: string;

    @Column({
        length: 50,
        type: 'varchar',
        name: 'prdt_stat_nm'
    })
    prdtStatNm?: string;

    @Column({
        length: 100,
        default: '',
        type: 'varchar'
    })
    nations?: string;

    @Column({
        length: 100,
        type: 'varchar',
        name: 'nation_alt'
    })
    nationAlt?: string;

    @Column({
        length: 200,
        type: 'varchar',
        default: ''
    })
    genres?: string;

    @Column({
        length: 100,
        type: 'varchar',
        name: 'genre_alt'
    })
    genreAlt?: string;

    @Column({
        length: 50,
        type: 'varchar',
        name: 'rep_nation_nm'
    })
    repNationNm?: string;

    @Column({
        length: 50,
        type: 'varchar',
        name: 'rep_genre_nm'
    })
    repGenreNm?: string;

    @Column({
        length: 800,
        type: 'varchar'
    })
    directors?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    actors?: string | null;

    @Column({
        length: 2000,
        type: 'varchar',
        default: ''
    })
    companies?: string;

    @Column({
        length: 200,
        default: '',
        type: 'varchar',
        name: 'show_types'
    })
    showTypes?: string;

    @Column({
        length: 200,
        default: '',
        type: 'varchar'
    })
    audits?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    staffs?: string | null;

    @UpdateDateColumn()
    update_dt?: Date;

    @CreateDateColumn()
    reg_dt?: Date;
}