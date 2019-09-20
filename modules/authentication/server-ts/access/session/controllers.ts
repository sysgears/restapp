import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.status(200).send();
};
