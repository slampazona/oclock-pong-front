import axios from 'axios';

export default axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 2000,
});
