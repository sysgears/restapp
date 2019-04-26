import welcome from '@restapp/welcome-server-ts';
import core from '@restapp/core-server-ts';
import i18n from '@restapp/i18n-server-ts';
import validation from '@restapp/validation-common-react';
import cookies from '@restapp/cookies-server-ts';
import mailer from '@restapp/mailer-server-ts';
import '@restapp/debug-server-ts';
import ssr from '@restapp/ssr-server-ts';

import ServerModule from '@restapp/module-server-ts';

const modules: ServerModule = new ServerModule(welcome, cookies, i18n, validation, mailer, core, ssr);

export default modules;
