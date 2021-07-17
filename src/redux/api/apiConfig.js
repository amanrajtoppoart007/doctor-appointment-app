import axios from 'axios';
import {convertFormData} from '../../config/common';
import {BASE_URL} from '../api';

//Auth api
export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

authApi.interceptors.request.use(
  async function (options) {
    if (options.data) {
      options.data = convertFormData(options.data);
    }
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);

//Authorized api
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

api.interceptors.request.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async function (options) {
    return options;
  },
  function (error) {
    return Promise.reject(error);
  },
);
