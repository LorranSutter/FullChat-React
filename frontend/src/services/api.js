import axios from 'axios';

import { baseURL } from './baseURL.json'

const api = axios.create({
    baseURL: baseURL
})

// api.defaults.withCredentials = true;

// api.defaults.headers.post['Content-Type'] = 'application/json';
// api.defaults.headers.post['Accept'] = 'application/json';

export default api;