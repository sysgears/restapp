import welcome from '@restapp/welcome-client-react';
import core from '@restapp/core-client-react-native';
import i18n from '@restapp/i18n-client-react';
import counter from '@restapp/counter-client-react';
import validation from '@restapp/validation-common-react';
import defaultRouter from '@restapp/router-client-react-native';

import ClientModule from '@restapp/module-client-react-native';

const modules = new ClientModule(welcome, counter, validation, defaultRouter, i18n, core);

export default modules;
