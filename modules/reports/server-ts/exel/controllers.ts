import { Request, Response } from 'express';

import generateExcel from './generateExcel';
import reportsDAO from '../sql';

export const excel = async (_req: Request, res: Response) => {
  try {
    const reportsData = await reportsDAO.getReportData();
    const excelFile = await generateExcel(reportsData);
    res.send(excelFile);
  } catch (e) {
    res.status(500);
  }
};
