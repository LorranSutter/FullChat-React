import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000"
})

// api.defaults.headers.post['Content-Type'] = 'application/json';
// api.defaults.headers.post['Accept'] = 'application/json';

export default api;