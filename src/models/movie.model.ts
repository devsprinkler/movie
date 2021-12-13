interface MovieDto {
    movieCd: string,
    movieNm: string,
    movieNmEn: string,
    prdtYear: number,
    openDt: number,
    typeNm: string,
    prdtStatNm: string,
    nationAlt: string,
    genreAlt: string,
    repNationNm: string,
    repGenreNm: string,
    directors: string,
    companies: string
}

interface MovieListApiVo {
    movieCd: string,
    movieNm: string,
    movieNmEn: string,
    prdtYear: string,
    openDt: string,
    typeNm: string,
    prdtStatNm: string,
    nationAlt: string,
    genreAlt: string,
    repNationNm: string,
    repGenreNm: string,
    directors: {
        peopleNm: string
    }[],
    companys: {
        companyCd: string,
        companyNm: string
    }[]
}

interface MovieDetailDto {
    movieCd: string,
    movieNm: string,
    movieNmEn: string,
    movieNmOg: string,
    prdtYear: number,
    showTm: number,
    openDt: number,
    typeNm: string,
    prdtStatNm: string,
    nations: string,
    genres: string,
    directors: string,
    actors: string,
    companies: string,
    showTypes: string,
    audits: string,
    staffs: string
}

interface MovieDetailApiVo {
    movieCd: string,
    movieNm: string,
    movieNmEn: string,
    movieNmOg: string,
    showTm: string,
    prdtYear: number,
    openDt: number,
    prdtStatNm: string,
    typeNm: string,
    nations: {
        nationsNm: string
    }[],
    genres: {
        genreNm: string
    }[],
    directors: {
        peopleNm: string,
        peopleNmEn: string
    }[],
    actors: {
        peopelNm: string,
        peopleNmEn: string,
        cast: string,
        castEn: string
    }[],
    companys: {
        companyCd: string,
        companyNm: string,
        companyNmEn: string,
        companyPartNm: string
    }[],
    audits: {
       auditNo: string,
       watchGradeNm: string
    }[],
    staffs: {
        peopleNm: string,
        peopleNmEn: string,
        staffRoleNm: string
    }[]
}