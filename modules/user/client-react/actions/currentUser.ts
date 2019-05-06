import axios from 'axios';

const CURRENT_USER = async () => axios.get(`${__API_URL__}/currentUser`);

export default CURRENT_USER;
