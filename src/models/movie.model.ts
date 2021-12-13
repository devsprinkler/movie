interface MovieDto {
    movieCd: number,
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

interface MovieApiVo {
    movieCd: number,
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
    directors: {
        peopleNm: string
    }[],
    companies: {
        companyCd: string,
        companyNm: string
    }[]
}

interface MovieDetailDto {
    movieCd: number,
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