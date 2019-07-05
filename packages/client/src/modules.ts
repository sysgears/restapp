import ClientModule from '@restapp/module-client-react';
import authentication from '@restapp/authentication-client-react';
import core from '@restapp/core-client-react';
import defaultRouter from '@restapp/router-client-react';
import i18n from '@restapp/i18n-client-react';
import look from '@restapp/look-client-react';
import payments from '@restapp/payments-client-react';
import user from '@restapp/user-client-react';
import validation from '@restapp/validation-common-react';
import welcome from '@restapp/welcome-client-react';
import '@restapp/favicon-common';

const pageNotFound = require('@restapp/page-not-found-client-react').default;

const modules = new ClientModule(
  authentication,
  user,
  welcome,
  look,
  validation,
  defaultRouter,
  i18n,
  pageNotFound,
  core,
  payments
);

export default modules;
