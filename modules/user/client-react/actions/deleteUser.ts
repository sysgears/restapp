import axios from 'axios';
import { ActionType } from '../reducers';

export default function DELETE_USER(id: number) {
  return {
    types: [null, ActionType.SET_CURRENT_USER, ActionType.CLEAR_CURRENT_USER],
    callAPI: () => axios.delete(`${__API_URL__}/deleteUser`, { data: id })
  };
}
