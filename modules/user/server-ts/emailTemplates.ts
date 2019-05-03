import { UserShape } from './sql';
import settings from '../../../settings';

const { app } = settings;

export const accountCreated = (url: string, user: UserShape) =>
  `<p>Hi, ${user.username}!</p>
   <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
   <p><a href="${url}">${url}</a></p>
   <p>Below are your login information</p>
   <p>Your email is: ${user.email}</p>`;

export const passwordUpdated = (url: string) =>
  `<p>Your account password has been updated.</p>
   <p>To view or edit your account settings, please visit the “Profile” page at</p>
   <p><a href="${url}">${url}</a></p>`;

export const confirmEmail = (url: string, user: UserShape) =>
  `<p>Hi, ${user.username}!</p>
   <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
   <p><a href="${url}">${url}</a></p>
   <p>Below are your login information</p>
   <p>Your email is: ${user.email}</p>`;

export const passwordReset = (url: string) =>
  `Please click this link to reset your password: <a href="${url}">${url}</a>`;
