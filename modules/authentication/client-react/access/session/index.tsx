import settings from '../../../../../settings';
import AccessModule from '../AccessModule';

const logout = async () => {
  // TODO request to server for logout
};

export default (settings.auth.session.enabled
  ? new AccessModule({
      logout: [logout]
    })
  : undefined);
