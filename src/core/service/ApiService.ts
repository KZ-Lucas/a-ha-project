import axios from 'axios';
import { ApiUtil } from '@util';

// TODO: constants로 분리
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://interview-test-api.a-ha.kr';
axios.defaults.timeout = 120000;

export function createRequest() {
  return function request<R>(url: string, params: Record<string, any> = {}) {
    return axios
      .get<R>(url + '?' + ApiUtil.objToQuery(params))
      .catch(err => {
        throw err.response;
      });
  }
}