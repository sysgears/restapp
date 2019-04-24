import jwt from 'jsonwebtoken';
import settings from '../../../../../settings';

const {
  jwt: { tokenExpiresIn, refreshTokenExpiresIn }
} = settings.auth;

const createTokens = async (identity: any, secret: string, refreshSecret: string, t: any) => {
  if (!identity.id) {
    throw new Error(t('auth:identityWithoutId'));
  }
  const createToken = jwt.sign({ identity }, secret, { expiresIn: tokenExpiresIn });
  const createRefreshToken = jwt.sign({ id: identity.id }, refreshSecret, { expiresIn: refreshTokenExpiresIn });

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens;
