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

const client = async (request: () => Promise<any>) => {
  try {
    const result = await request();
    return result;
  } catch (e) {
    if (e.response && e.response.status === 401) {
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
      await request();
    }
    return e.response;
  }
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

axios.interceptors.response.use(async (res: any) => {
  if (res.config.url.includes('login')) {
    if (!!res.data && res.data.tokens) {
      const {
        data: {
          tokens: { accessToken, refreshToken }
        }
      } = res;
      await saveTokens({ accessToken, refreshToken });
    } else {
      await removeTokens();
    }
    return res;
  }
});

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      logout: [removeTokens],
      httpClient: client
    })
  : undefined);
