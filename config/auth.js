export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  session: {
    enabled: false
  },
  jwt: {
    enabled: true,
    tokenExpiresIn: '8h',
    refreshTokenExpiresIn: '7d'
  },
  password: {
    requireEmailConfirmation: true,
    sendPasswordChangesEmail: true,
    minLength: 8,
    enabled: true
  }
};
