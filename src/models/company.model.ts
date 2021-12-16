interface CompanyDto {
    companyCd: string,
    companyNm: string,
    companyNmEn: string,
    companyPartNames: string,
    ceoNm: string,
    filmoNames: string
}

interface CompanyListApiVo {
    companyCd: string,
    companyNm: string,
    companyNmEn: string,
    companyPartNames: string,
    ceoNm: string,
    filmoNames: string
}

interface CompanyDetailDto {
    companyCd: string,
    companyNm: string,
    companyNmEn: string,
    ceoNm: string,
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
    }[],
    filmos: {
        "movieCd": string,
        "movieNm": string,
        "companyPartNm": string
    }[]
}