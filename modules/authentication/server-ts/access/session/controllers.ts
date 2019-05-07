import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
  req.logout();
};
