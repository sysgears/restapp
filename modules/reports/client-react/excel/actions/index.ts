import axios from 'axios';

const GET_EXCEL = () => ({
  types: {},
  APICall: () => axios.get(`${__API_URL__}/excel`)
});
export default GET_EXCEL;
