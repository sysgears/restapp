export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  session: {
    enabled: false,
    secret: 'secret',
    store: null,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  },
  jwt: {
    enabled: true,
    tokenExpiresIn: '10s',
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
      enabled: false,
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET,
      callbackURL: '/api/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['id', 'emails', 'displayName']
    },
    github: {
      enabled: false,
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email']
    },
    linkedin: {
      enabled: false,
      clientID: process.env.LINKEDIN_CLIENTID,
      clientSecret: process.env.LINKEDIN_CLIENTSECRET,
      callbackURL: '/api/auth/linkedin/callback',
      scope: ['r_liteprofile']
    },
    google: {
      enabled: false,
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
  }
};
