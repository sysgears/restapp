import axios from 'axios';

const USER = async (id: number) => axios.get(`${__API_URL__}/user/${id}`);

export default USER;
