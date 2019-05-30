import React from 'react';
import * as H from 'history';
import { CookiesProvider } from 'react-cookie';
import { FormikErrors } from 'formik';

import { TranslateFunction } from '@restapp/i18n-client-react';
import ClientModule from '@restapp/module-client-react';

import signUp from './signUp';
import profile from './profile';
import users from './users';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';

export enum UserRole {
  admin = 'admin',
  user = 'user'
}

interface Auth {
  lnDisplayName: string;
  lnId: string;
  googleDisplayName: string;
  googleId: string;
  ghDisplayName: string;
  ghId: string;
  fbId: string;
  fbDisplayName: string;
}

interface UserProfile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

export interface User extends UserProfile, Auth {
  id?: number | string;
  username: string;
  role: UserRole;
  isActive: boolean;
  email: string;
}

export interface CommonProps {
  t?: TranslateFunction;
  history?: H.History;
}

interface HandleSubmitProps<P> {
  setErrors: (errors: FormikErrors<P>) => void;
  props: P;
}

interface Errors {
  message?: string;
}
export interface FormProps<V> {
  handleSubmit: (values: V, props: HandleSubmitProps<V>) => void;
  onSubmit: (values: V) => Promise<any>;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t?: TranslateFunction;
}

export default new ClientModule(signUp, profile, users, {
  localization: [{ ns: 'user', resources }],
  dataRootComponent: [DataRootComponent],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
