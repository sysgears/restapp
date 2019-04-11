import { Express, Request, Response } from 'express';

export const authenticationMiddleware = () => {
  return (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send('forbidden');
  };
};

const admin = (app: Express) => {
  app.get('/admin', authenticationMiddleware(), (req, res) => {
    res.send('this is admin');
  });
};

export default admin;
