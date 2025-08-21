import axios from 'axios'
import qs from 'qs'
import { serverUrl } from './constants'

const backendApi = axios.create({
  baseURL: serverUrl,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
})

export default async ({ method = 'GET', headers = {}, ...options }) => {
  return backendApi({
    method,
    headers: {
      ...headers,
      'x-client-app-type': 'web',
    },
    ...options,
  });
};