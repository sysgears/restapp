import axios from 'axios';
import { ActionType } from '../reducers';

export default function USER(id: number) {
  return {
    types: {
      SUCCESS: ActionType.SET_USER
    },
    APICall: () => axios.get(`${__API_URL__}/user/${id}`)
  };
}
