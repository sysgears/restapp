import axios from 'axios';
import { ActionType } from '../reducers';

export default function DELETE_USER(id: number) {
  return {
    types: {
      SUCCESS: ActionType.DELETE_USER
    },
    APICall: () => axios.delete(`${__API_URL__}/deleteUser`, { data: { id } })
  };
}
