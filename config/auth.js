export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  session: {
    enabled: true
  },
  jwt: {
    enabled: false,
    tokenExpiresIn: '1m',
    refreshTokenExpiresIn: '7d'
  },
  password: {
    requireEmailConfirmation: true,
    sendPasswordChangesEmail: true,
    minLength: 8,
    enabled: true
  },
  social: {
    facebook: {
      enabled: true,
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET,
      callbackURL: '/api/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['id', 'emails', 'displayName']
    },
    github: {
      enabled: true,
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email']
    },
    linkedin: {
      enabled: true,
      clientID: process.env.LINKEDIN_CLIENTID,
      clientSecret: process.env.LINKEDIN_CLIENTSECRET,
      callbackURL: '/api/auth/linkedin/callback',
      scope: ['r_liteprofile']
    },
    google: {
      enabled: true,
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
  }
};
