import settings from '../../../../../settings';
import AccessModule from '../AccessModule';
import axios from 'axios';

const logout = async () => {
  await axios.post(`${__API_URL__}/logout`);
};

export default (settings.auth.session.enabled
  ? new AccessModule({
      logout: [logout]
    })
  : undefined);
