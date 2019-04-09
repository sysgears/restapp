import core from '@restapp/core-client-react';
import look from '@restapp/look-client-react';
import i18n from '@restapp/i18n-client-react';
import validation from '@restapp/validation-common-react';
import ClientModule from '@restapp/module-client-react';
import defaultRouter from '@restapp/router-client-react';
import '@restapp/favicon-common';

const pageNotFound = require('@restapp/page-not-found-client-react').default;

const modules = new ClientModule(look, validation, defaultRouter, i18n, pageNotFound, core);

export default modules;
