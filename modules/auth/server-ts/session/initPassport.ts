import passport from 'passport';
import { Strategy } from 'passport-local';

const userDB: User = {
  username: 'test-user',
  password: '123',
  id: 1
};

interface User {
  username: string;
  password: string;
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
    new Strategy((username: string, password: string, done: any) => {
      if (username !== userDB.username || password !== userDB.password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, userDB);
    })
  );
};

export default initPassport;
