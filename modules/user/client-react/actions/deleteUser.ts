import axios from 'axios';
import { ActionType } from '../reducers';

export default function DELETE_USER(id: number) {
  return {
    types: [null, ActionType.DELETE_USER, null] as ActionType[],
    callAPI: () => axios.delete(`${__API_URL__}/deleteUser`, { data: { id } })
  };
}
