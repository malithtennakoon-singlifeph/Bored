const END_POINTS = {
  BORED_URL: 'https://www.boredapi.com/api/activity',
  NATIONALIZE_URL: 'https://api.nationalize.io?',
  UNIVERSITIES_LIST: 'http://universities.hipolabs.com/search?country=',
  CAT_FACTS: 'https://catfact.ninja/fact',
  GUESS_AGE: 'https://api.agify.io?name=',
  GUESS_GENDER: 'https://api.genderize.io?name=',
  GET_IP: 'https://api.ipify.org?format=json',
  GET_IP_INFO: 'https://ipinfo.io/',
  DOG_PICS: 'https://dog.ceo/api/breeds/image/random',
};

const API_KEY = '6ebPqFmGJpLarNhENyZ0kdB5X4SQaLseA0mkQhCv';

const HTTP_METHOD = {
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
};

const createHeaders = headers => {
  let commonHeaders = {
    ...headers,
    'Content-Type': 'application/json',
  };
  return commonHeaders;
};

const create = async (method, url, body, headers) => {
  return await fetch(url, {
    method: method,
    headers: createHeaders(headers),
    body: JSON.stringify(body),
  });
};

const API = {
  create,
  HTTP_METHOD,
  END_POINTS,
  API_KEY,
};

export default API;
