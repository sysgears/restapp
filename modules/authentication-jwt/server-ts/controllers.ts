import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import settings from '../../../settings';
import createTokens from './createTokens';

const userDB: any = {
  username: 'test-user',
  password: '123',
  id: 1
};

export const refreshTokens = async (req: Request, res: Response) => {
  const {
    body: { refreshToken: inputRefreshToken }
  } = req;
  const decodedToken = jwt.decode(inputRefreshToken);
  const isValidToken = decodedToken && decodedToken.id;

  if (!isValidToken) {
    res.send('auth:invalidRefresh');
  }

  const user = userDB.id === decodedToken.id ? userDB : null;
  const refreshSecret = settings.auth.secret + user.password;

  try {
    jwt.verify(inputRefreshToken, refreshSecret);
  } catch (err) {
    res.send(err);
  }

  const [accessToken, refreshToken] = await createTokens(user);

  res.json({
    accessToken,
    refreshToken
  });
};
