import axios from 'axios';
import { User } from '..';

const ADD_USER = async (user: User) => axios.post(`${__API_URL__}/addUser`, { ...user });

export default ADD_USER;
