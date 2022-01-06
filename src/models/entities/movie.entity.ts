import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tb_movies')
export class MovieEntity {
    @PrimaryColumn({
        length: 10,
        type: 'varchar'
    })
    movie_cd?: string;

    @Column({
        length: 200,
        type: 'varchar'
    })
    movie_nm?: string;

    @Column({
        length: 200,
        type: 'varchar'
    })
    movie_nm_en?: string;

    @Column({
        length: 100,
        type: 'varchar'
    })
    movie_nm_og?: string;

    @Column({
        type: 'int'
    })
    prdt_year?: number;

    @Column({
        default: 0,
        type: 'int'
    })
    show_tm?: number;

    @Column({
        type: 'int'
    })
    open_dt?: number;

    @Column({
        length: 50,
        type: 'varchar'
    })
    type_nm?: string;

    @Column({
        length: 50,
        type: 'varchar'
    })
    prdt_stat_nm?: string;

    @Column({
        length: 100,
        default: '',
        type: 'varchar'
    })
    nations?: string;

    @Column({
        length: 100,
        type: 'varchar'
    })
    nation_alt?: string;

    @Column({
        length: 200,
        type: 'varchar'
    })
    genres?: string;

    @Column({
        length: 100,
        type: 'varchar'
    })
    genre_alt?: string;

    @Column({
        length: 50,
        type: 'varchar'
    })
    rep_nation_nm?: string;

    @Column({
        length: 50,
        type: 'varchar'
    })
    rep_genre_nm?: string;

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
        type: 'varchar'
    })
    companies?: string;

    @Column({
        length: 200,
        default: '',
        type: 'varchar'
    })
    show_types?: string;

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
}