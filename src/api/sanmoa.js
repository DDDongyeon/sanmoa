//search,length,location,
import { Router } from 'express';
import request from 'request';
import path from '../../models/path';
import mountaindata from '../../models/mountainDB';

const convert = require('xml-js');
const router = Router();
//일단 지도
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//등산로 좌표/데이터, 총 경로(m),시점높이?,종점높이, 난이도
router.post('/route', async (req, res) => {
  let { xLocation, yLocation } = req.body;

  //카카오 지역코드 변환
  const REST_API_KEY = process.env.REST_API_KEY;
  const getRegionCode = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${xLocation}&y=${yLocation}`,
    {
      method: 'GET',
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
    }
  ).then((response) => response.json());
  const regionCode = getRegionCode.documents[0].code.substr(0, 8);

  //등산로api
  var url = 'http://api.vworld.kr/req/data';
  var queryParams =
    '?' +
    encodeURIComponent('key') +
    process.env.VWORLD_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('domain') +
    '=' +
    encodeURIComponent('http://3.35.173.122:4000'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('service') +
    '=' +
    encodeURIComponent('data'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('request') +
    '=' +
    encodeURIComponent('getfeature'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('data') +
    '=' +
    encodeURIComponent('LT_L_FRSTCLIMB'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('attrfilter') +
    '=' +
    encodeURIComponent(
      'emdCd:=:' + regionCode //+ '|mntn_nm:like:' + mountainNm
    ); /*읍면동코드 */
  queryParams +=
    '&' +
    encodeURIComponent('columns') +
    '=' +
    encodeURIComponent(
      'sec_len,start_z,end_z,cat_nam,mntn_nm,ag_geom'
    ); /*총길이,시작점,종착점,명칭,난이도*/

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

//웹 서칭(다음 검색 기반)
router.post('/keyword', async (req, res) => {
  let keyword = req.body.keyword;
  let queryword = encodeURI(keyword, 'UTF-8');
  var url = `https://dapi.kakao.com//v2/search/web?query=${queryword}&size=30`;
  var REST_API_KEY = process.env.REST_API_KEY;
  request(
    {
      url: url,
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
      method: 'GET',
    },
    function (error, response, body) {
      let info = JSON.parse(body);

      res.json(info);
    }
  );
});

//산 정보
router.post('/search', async (req, res) => {
  const mountain = req.body.mntNm; // 추후 지리산은 query로 요청 받으면 전달
  var url =
    'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
  var queryParams =
    '?' +
    encodeURIComponent('servicekey') +
    process.env.DATA_API_KEY; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('mntnNm') +
    '=' +
    encodeURIComponent(mountain); /*산 정보*/
  queryParams +=
    '&' + encodeURIComponent('mntnAdd') + '=' + encodeURIComponent(''); /* */
  queryParams +=
    '&' +
    encodeURIComponent('mntnInfoAraCd') +
    '=' +
    encodeURIComponent(''); /* */

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    function (error, response, body) {
      var xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 });
      let info = JSON.parse(xmlToJson);
      res.json(info);
    }
  );
});

router.post('/totalroute', async (req, res) => {
  const keyword = req.body.keyword;
  console.log(keyword);
  const mntnPath = await path.findAll({
    where: {
      MNTN_NM: keyword,
    },
    attributes: ['id', 'MNTN_NM', 'PMNTN_SN', 'paths_x', 'paths_y'],
  });

  const mntnSpot = await mountaindata.findAll({
    where: {
      MNTN_NM: keyword,
    },
    attributes: ['MNTN_CODE', 'PMNTN_SN', 'PMNTN_NM', 'PMNTN_DFFL', 'PMNTN_LT'],
  });

  if (mntnSpot.length === 0) {
    //데이터가 하나도 없을 시, []
    return res.json({
      data: [],
    });
  }
  if (mntnPath.length === 0) {
    //데이터가 하나도 없을 시, []
    return res.json({
      data: [],
    });
  }

  return res.json({
    mntnSpot,
    mntnPath,
  });
});

export default router;
