import axios from 'axios';

const Api = axios.create({ baseURL: 'http://192.168.1.254:3001' });

export default Api;
