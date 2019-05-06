import axios from 'axios';
import { OrderBy, Filter } from '..';

const USERS = async (orderBY: OrderBy, filter: Filter) =>
  axios.get(`${__API_URL__}/users`, { params: { filter, orderBY } });

export default USERS;
