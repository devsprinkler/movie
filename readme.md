### Server deploy command
```bash
./server_deploy.sh
```
or
```bash
npm run deploy-development
or
npm run deploy-test
or
npm run deploy-production
```
### Environment
```
node v14.17.5
nvm v6.14.14
mysql v5.7.36
```

### APIs
```
[GET] /movie/list/:movieCd
[GET] /movie/search/:movieNm
[GET] /movie/detail/:movieCd

[GET] /company/list/:companyCd
[GET] /company/search/:companyNm
[GET] /company/detail/:companyCd

[GET] /people/list/:peopleCd
[GET] /people/search/:peopleNm
[GET] /people/detail/:peopleCd
```