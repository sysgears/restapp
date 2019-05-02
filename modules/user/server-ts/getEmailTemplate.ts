import { UserShape } from './sql';
import settings from '../../../settings';

interface EmailData {
  user?: UserShape;
  url: string;
}

const { app } = settings;

const getEmailTemplate = (type: string, { user, url }: EmailData) => {
  switch (type) {
    case 'accountCreated':
      return `<p>Hi, ${user.username}!</p>
              <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
              <p><a href="${url}">${url}</a></p>
              <p>Below are your login information</p>
              <p>Your email is: ${user.email}</p>`;

    case 'passwordUpdated':
      return `<p>Your account password has been updated.</p>
              <p>To view or edit your account settings, please visit the “Profile” page at</p>
              <p><a href="${url}">${url}</a></p>`;

    case 'confirmEmail':
      return `<p>Hi, ${user.username}!</p>
              <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
              <p><a href="${url}">${url}</a></p>
              <p>Below are your login information</p>
              <p>Your email is: ${user.email}</p>`;

    case 'passwordReset':
      return `Please click this link to reset your password: <a href="${url}">${url}</a>`;

    default:
      return '';
  }
};

export default getEmailTemplate;
