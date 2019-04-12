import { Request, Response } from 'express';
import passport from 'passport';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';

const successLogin = (req: Request, res: Response) => {
  res.send('user is logged in');
};

export default new ServerModule({
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'login',
      middleware: [passport.authenticate('login'), successLogin]
    }
  ]
});
