import userDAO from './sql';

export const currentUser = async ({ user: identity }: any, res: any) => {
  if (identity.id) {
    res.json(await userDAO.getUser(identity.id));
  } else {
    res.send(null);
  }
};
