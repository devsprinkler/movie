interface CompanyDto extends CompanyListApiVo {

}

interface CompanyListApiVo {
    companyCd: string,
    companyNm: string,
    companyNmEn: string,
    companyPartNames: string,
    ceoNm: string,
    filmoNames: string
}

interface CompanyDetailDto extends CompanyDetailApiVo {
    parts: string,
    filmos: string
}

interface CompanyDetailApiVo {
    companyCd: string,
    companyNm: string,
    companyNmEn: string,
    ceoNm: string,
    parts: {
        "companyPartNm": string
    }[] | string,
    filmos: {
        "movieCd": string,
        "movieNm": string,
        "companyPartNm": string
    }[] | string
}