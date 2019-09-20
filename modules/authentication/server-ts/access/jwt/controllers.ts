import jwt from 'jsonwebtoken';

import settings from '../../../../../settings';
import createTokens from './createTokens';

export const refreshTokens = async (req: any, res: any) => {
  const {
    body: { refreshToken: inputRefreshToken },
    t
  } = req;
  const {
    locals: {
      appContext: {
        user: { getHash, getIdentity }
      }
    }
  } = res;
  const decodedToken = jwt.decode(inputRefreshToken) as { [key: string]: any };
  const isValidToken = decodedToken && decodedToken.id;

  if (!isValidToken) {
    return res.status(401).send({
      errors: {
        message: t('auth:invalidRefresh')
      }
    });
  }

  const identity = await getIdentity(decodedToken.id);
  const hash = getHash ? await getHash(decodedToken.id) : '';
  const refreshSecret = settings.auth.secret + hash;

  try {
    jwt.verify(inputRefreshToken, refreshSecret);
  } catch (err) {
    return res.status(401).send({ errors: err });
  }

  const [accessToken, refreshToken] = await createTokens(identity, settings.auth.secret, refreshSecret, req.t);

  res.json({
    accessToken,
    refreshToken
  });
};
