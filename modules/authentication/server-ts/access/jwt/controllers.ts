import jwt from 'jsonwebtoken';

import settings from '../../../../../settings';
import createTokens from './createTokens';

const userDB: any = {
  username: 'test-user',
  password: '123',
  id: 1
};

export const refreshTokens = async (req: any, res: any) => {
  const {
    body: { refreshToken: inputRefreshToken },
    t
  } = req;
  const decodedToken = jwt.decode(inputRefreshToken) as { [key: string]: any };
  const isValidToken = decodedToken && decodedToken.id;

  if (!isValidToken) {
    res.send(t('auth:invalidRefresh'));
  }

  const identity = userDB.id === decodedToken.id ? userDB : null;
  const refreshSecret = settings.auth.secret + identity.password;

  try {
    jwt.verify(inputRefreshToken, refreshSecret);
  } catch (err) {
    res.send(err);
  }

  const [accessToken, refreshToken] = await createTokens(identity, settings.auth.secret, refreshSecret, req.t);

  res.json({
    accessToken,
    refreshToken
  });
};
