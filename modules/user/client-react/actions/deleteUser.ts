import axios from 'axios';

const DELETE_USER = async (id: number) => axios.post(`${__API_URL__}/deleteUser`, { id });

export default DELETE_USER;
