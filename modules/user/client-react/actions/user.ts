import axios from 'axios';
import { ActionType } from '../reducers';

export default function USER(id: number) {
  return {
    types: [null, ActionType.SET_USER, null],
    callAPI: () => axios.get(`${__API_URL__}/user/${id}`)
  };
}
