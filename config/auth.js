export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  session: {
    enabled: false
  },
  jwt: {
    enabled: true,
    tokenExpiresIn: '1m',
    refreshTokenExpiresIn: '7d'
  }
};
