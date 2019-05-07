import axios from 'axios';
import { getItem, setItem, removeItem } from '@restapp/core-common/clientStorage';
import settings from '../../../../../settings';
import AccessModule from '../AccessModule';

enum TokensEnum {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken'
}

interface Tokens {
  [key: string]: TokensEnum;
}

const saveTokens = async ({ accessToken, refreshToken }: Tokens) => {
  await setItem(TokensEnum.accessToken, accessToken);
  await setItem(TokensEnum.refreshToken, refreshToken);
};

const removeTokens = async () => {
  await removeItem(TokensEnum.accessToken);
  await removeItem(TokensEnum.refreshToken);
};

axios.interceptors.request.use(async config => {
  const accessToken = await getItem(TokensEnum.accessToken);

  if (config.url.includes('currentUser') && !(await getItem(TokensEnum.refreshToken))) {
    throw new axios.Cancel('Operation canceled');
  }

  const arrayExceptions = ['login', 'refreshTokens'];
  const checkInclude = arrayExceptions.some(exception => config.url.includes(exception));

  config.headers = !checkInclude && accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return config;
});

axios.interceptors.response.use(
  async (res: any) => {
    if (res.config.url.includes('login')) {
      if (!!res.data && res.data.login.tokens) {
        const {
          data: {
            login: {
              tokens: { accessToken, refreshToken }
            }
          }
        } = res;
        await saveTokens({ accessToken, refreshToken });
      } else {
        await removeTokens();
      }
      return res;
    }

    if (res && res.status > 400 && res.status < 500) {
      try {
        const { data } = await axios.post(`${__API_URL__}/refreshToken`, {
          refreshToken: await getItem('refreshToken')
        });
        if (data && data.refreshTokens) {
          const { accessToken, refreshToken } = data.refreshTokens;
          await saveTokens({ accessToken, refreshToken });
        } else {
          await removeTokens();
        }
      } catch (e) {
        await removeTokens();
        throw e;
      }
      await res.request();
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      logout: [removeTokens]
    })
  : undefined);
