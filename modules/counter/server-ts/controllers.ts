import counterDAO from './sql';

export const getCounter = async (req: any, res: any) => {
  res.json(await counterDAO.counterQuery());
};

export const addCounter = async ({ body: { amount } }: any, res: any) => {
  try {
    await counterDAO.addCounter(amount);
    res.send();
  } catch (e) {
    res.status(500).json({
      errors: {
        message: 'Fail add count',
        error: e
      }
    });
  }
};
