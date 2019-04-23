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

export const authReqInterceptor = axios.interceptors.request.use(async config => {
  const accessToken = await getItem(TokensEnum.accessToken);

  if (['currentUser'].indexOf(config.url) > 0 && !(await getItem(TokensEnum.refreshToken))) {
    throw new axios.Cancel('Operation canceled');
  }

  config.headers =
    ['login', 'refreshTokens'].indexOf(config.url) < 0 && accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return config;
});

export const authResInterceptor = axios.interceptors.response.use(async res => {
  if (['login'].indexOf(res.config.url) < 0) {
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
      const { data } = await axios(`${__API_URL__}/refreshToken`, {
        data: { refreshToken: await getItem('accessToken') }
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
});

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      logout: [removeTokens]
    })
  : undefined);
