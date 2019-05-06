import axios from 'axios';
import { User } from '..';

const EDIT_USER = async (user: User) => axios.post(`${__API_URL__}/editUser`, { ...user });

export default EDIT_USER;
