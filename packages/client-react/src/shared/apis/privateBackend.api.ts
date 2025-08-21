import axios from 'axios'
import qs from 'qs'
import { serverUrl } from './constants'

const backendApi = axios.create({
  baseURL: serverUrl,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
})

export default async ({ method = 'GET', headers = {}, token, ...options }) => {
  if (!token) {
    throw new Error('unauthorized : no token');
  }

  return backendApi({
    method,
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
      'x-client-app-type': 'web',
    },
    ...options,
  });
};