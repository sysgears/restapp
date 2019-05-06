import axios from 'axios';

interface Value {
  email: string;
}

const FORGOT_PASSWORD = async (value: Value) => axios.post(`${__API_URL__}/forgotPassword`, { value });

export default FORGOT_PASSWORD;
