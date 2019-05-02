import axios from 'axios';

interface OrderBy {
  column: string;
  order: string;
}

interface Filter {
  searchText: string;
  role: string;
  isActive: boolean;
}

const USERS = async (orderBY: OrderBy, filter: Filter) =>
  axios.get(`${__API_URL__}/users`, { params: { filter, orderBY } });

export default USERS;
