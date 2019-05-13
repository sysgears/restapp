import welcome from '@restapp/welcome-server-ts';
import core from '@restapp/core-server-ts';
import i18n from '@restapp/i18n-server-ts';
import validation from '@restapp/validation-common-react';
import cookies from '@restapp/cookies-server-ts';
import mailer from '@restapp/mailer-server-ts';
import user from '@restapp/user-server-ts';
import authentication from '@restapp/authentication-server-ts';
import upload from '@restapp/upload-server-ts';
import '@restapp/debug-server-ts';

import ServerModule from '@restapp/module-server-ts';

const modules: ServerModule = new ServerModule(
  authentication,
  welcome,
  cookies,
  i18n,
  validation,
  mailer,
  core,
  user,
  upload
);

export default modules;
