import { Request, Response } from 'express';

import reportsDAO from './sql';

export const report = async (_req: Request, res: Response) => {
  res.json(await reportsDAO.getReportData());
};
