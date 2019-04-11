import passport from 'passport';
import { Strategy } from 'passport-local';

const userDB = {
  username: 'test-user',
  passWord: '123',
  id: 1
};

interface User {
  username: string;
  passWord: string;
  id: number;
}

passport.serializeUser((user: User, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  if (username === userDB.username) {
    return cb(null, userDB);
  }
  return cb(null);
});

const initPassport = () => {
  passport.use(
    new Strategy((username, password, done) => {
      if (userDB.username !== username || userDB.passWord !== password) {
        return done(null, false);
      }

      return done(null, userDB);
    })
  );
};

export default initPassport;
