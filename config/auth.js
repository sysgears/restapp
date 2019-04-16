export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  session: {
    enabled: true
  },
  jwt: {
    enabled: false,
    tokenExpiresIn: '1m',
    refreshTokenExpiresIn: '7d'
  }
};
