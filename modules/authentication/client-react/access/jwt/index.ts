import axios from 'axios';
import { getItem, setItem, removeItem } from '@restapp/core-common/clientStorage';
import { Middleware } from 'redux';
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

const requestMiddleware: Middleware = ({ dispatch }) => next => action => {
  const { types, callAPI, payload, ...rest } = action;

  if (!types) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAIL] = types;

  next({ type: REQUEST, payload, ...rest });

  const handleCallApi = async () => {
    try {
      const result = await client(callAPI);
      const data = result && result.data;
      next({
        type: SUCCESS,
        payload: data,
        ...rest
      });
      return data;
    } catch (e) {
      if (e.response.status === 401) {
        dispatch(action);
      }
      const data = e.response && e.response.data;
      next({
        type: FAIL,
        payload: data,
        ...rest
      });
      return data;
    }
  };

  return handleCallApi();
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
        if (data) {
          const { accessToken, refreshToken } = data;
          await saveTokens({ accessToken, refreshToken });
        } else {
          await removeTokens();
        }
      } catch (e) {
        await removeTokens();
        throw e;
      }
    }
    throw e;
  }
};

axios.interceptors.request.use(async config => {
  const accessToken = await getItem(TokensEnum.accessToken);

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
      return res.data.user;
    } else {
      await removeTokens();
    }
  }
  return res;
});

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      logout: [removeTokens],
      requestMiddleware
    })
  : undefined);
