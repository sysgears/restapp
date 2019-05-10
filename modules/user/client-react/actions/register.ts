import axios from 'axios';
import { RegisterSubmitProps } from '..';

export default function REGISTER(value: RegisterSubmitProps) {
  return {
    types: [null, null, null] as any,
    callAPI: (client: (request: () => Promise<any>) => any) =>
      client
        ? client(() => axios.post(`${__API_URL__}/register`, { ...value }))
        : axios.post(`${__API_URL__}/register`, { ...value })
  };
}
