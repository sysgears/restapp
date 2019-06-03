import { Request, Response } from 'express';

import generator from './helpers/generator';
import reportsDAO from '../sql';

export const pdf = async (_req: Request, res: Response) => {
  const {
    locals: { t }
  } = res;
  try {
    const reportsData = await reportsDAO.getReportData();
    const pdfFile = await generator(reportsData, t);
    res.send(Array.from(new Uint8Array(pdfFile)));
  } catch (e) {
    res.status(500);
  }
};
