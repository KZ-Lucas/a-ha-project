import axios from 'axios';
import { ApiUtil } from '@util';
import { apiBaseUrl, responseTimeout } from '@constants/common';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = apiBaseUrl;
axios.defaults.timeout = responseTimeout;

export function createRequest() {
  return function request<R>(url: string, params: Record<string, any> = {}) {
    return axios
      .get<R>(url + '?' + ApiUtil.objToQuery(params))
      .catch(err => {
        throw err.response;
      });
  }
}