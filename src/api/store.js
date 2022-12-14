import { Router } from 'express';
import request from 'request';
const convert = require('xml-js');

const router = Router();

//관광정보 키워드 검색
router.post('/search', async (req, res) => {
  const searchWord = req.body.word; //나중에 위치 받아오면 그 주변 지역코드로 바꿔서
  console.log(searchWord);
  var url = 'http://apis.data.go.kr/B551011/KorService/searchKeyword';
  var queryParams =
    '?' +
    encodeURIComponent('ServiceKey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A');
  queryParams +=
    '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent('1');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  queryParams +=
    '&' + encodeURIComponent('keyword') + '=' + encodeURI(searchWord);
  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});
//카테고리별 검색 (음식/카페/숙박/레포츠)
router.get('/restaurant', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A05');
  queryParams +=
    '&' + encodeURIComponent('cat2') + '=' + encodeURIComponent('A0502');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  queryParams +=
    '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent('1');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/cafe', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A05');
  queryParams +=
    '&' + encodeURIComponent('cat2') + '=' + encodeURIComponent('A0502');
  queryParams +=
    '&' + encodeURIComponent('cat3') + '=' + encodeURIComponent('A05020900');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  queryParams +=
    '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent('1');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/stay', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('B02');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  queryParams +=
    '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent('1');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/leport', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A03');
  queryParams +=
    '&' + encodeURIComponent('areaCode') + '=' + encodeURIComponent('1');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

export default router;
