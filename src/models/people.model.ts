interface PeopleDto {
    peopleCd: string,
    peopleNm: string,
    peopleNmEn: string,
    repRoleNm: string,
    filmoNames: any
}

interface PeopleListApiVo {
    peopleCd: string,
    peopleNm: string,
    peopleNmEn: string,
    repRoleNm: string,
    filmoNames: string
}

interface PeopleDetailDto {
    peopleCd: string,
    peopleNm: string,
    peopleNmEn: string,
    sex: string,
    repRoleNm: string,
    homepages: any,
    filmos: any
}

interface PeopleDetailApiVo {
    peopleCd: string,
    peopleNm: string,
    peopleNmEn: string,
    sex: string,
    repRoleNm: string,
    homepages: {
        homepgUrl: string
    }[],
    filmos: {
        movieCd: string,
        movieNm: string,
        moviePartNm: string
    }[]
}