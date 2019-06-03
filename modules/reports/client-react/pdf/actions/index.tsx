import axios from 'axios';

const GET_PDF = () => ({
  types: {},
  APICall: () => axios.get(`${__API_URL__}/pdf`)
});
export default GET_PDF;
