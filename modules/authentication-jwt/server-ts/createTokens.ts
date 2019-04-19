import jwt from 'jsonwebtoken';
import settings from '../../../settings';

interface User {
  username: string;
  password: string;
  id: number;
}

const {
  secret,
  jwt: { tokenExpiresIn, refreshTokenExpiresIn }
} = settings.auth;

const createTokens = async (user: User) => {
  const refreshSecret = secret + user.password;

  const createToken = jwt.sign({ user }, secret, { expiresIn: tokenExpiresIn });
  const createRefreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: refreshTokenExpiresIn });

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens;
