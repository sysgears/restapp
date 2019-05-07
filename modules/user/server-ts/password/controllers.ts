import { UserShape } from './../sql';
import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import { log } from '@restapp/core-common';
import { mailer } from '@restapp/mailer-server-ts';

import userDAO from '../sql';
import settings from '../../../../settings';
import { ValidationErrors } from '../';
import emailTemplate from '../emailTemplate';
import { createPasswordHash } from '.';

const {
  auth: { password, secret },
  app
} = settings;

export const register = async ({ body, t }: any, res: any) => {
  const errors: ValidationErrors = {};
  const userExists = await userDAO.getUserByUsername(body.username);
  if (userExists) {
    errors.username = t('user:auth.password.usernameIsExisted');
  }

  const emailExists = (await userDAO.getUserByEmail(body.email)) as UserShape;
  if (emailExists) {
    errors.email = t('user:auth.password.emailIsExisted');
  }

  if (!isEmpty(errors)) {
    return res.status(422).send({
      errors: {
        message: t('user:auth.password.registrationFailed'),
        ...errors
      }
    });
  }

  let userId = 0;
  if (!emailExists) {
    const passwordHash = await createPasswordHash(body.password);
    const isActive = !password.requireEmailConfirmation;
    [userId] = await userDAO.register({ ...body, isActive }, passwordHash);

    // if user has previously logged with facebook auth
  } else {
    await userDAO.updatePassword(emailExists.userId, body.password);
    userId = emailExists.userId;
  }

  const user = (await userDAO.getUser(userId)) as UserShape;

  if (mailer && password.requireEmailConfirmation && !emailExists) {
    // async email
    jwt.sign({ identity: pick(user, 'id') }, secret, { expiresIn: '1d' }, (err, emailToken) => {
      const encodedToken = Buffer.from(emailToken).toString('base64');
      const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
      mailer.sendMail({
        from: `${app.name} <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Confirm Email',
        html: emailTemplate.confirmEmail(url, user)
      });
      log.info(`Sent registration confirmation email to: ${user.email}`);
    });
  }

  res.json(user);
};
