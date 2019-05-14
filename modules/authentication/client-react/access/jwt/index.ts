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

const refreshAccessToken = async () => {
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
};

const reduxMiddleware: Middleware = ({ dispatch }) => next => action => {
  const { types, callAPI, status, ...rest } = action;

  (async () => {
    try {
      if (status === 401) {
        await refreshAccessToken();
        const newAction = { ...action, status: null };
        return dispatch(newAction);
      }
      return next(action);
    } catch (e) {
      next({
        type: types.FAIL,
        ...rest
      });
      throw e;
    }
  })();
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
      res.data = res.data.user;
      return res;
    } else {
      await removeTokens();
    }
  }
  return res;
});

export default (settings.auth.jwt.enabled
  ? new AccessModule({
      logout: [removeTokens],
      reduxMiddleware: [reduxMiddleware]
    })
  : undefined);
