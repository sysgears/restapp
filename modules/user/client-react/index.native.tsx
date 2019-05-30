import React from 'react';
import { NavigationContainer, NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';
import { FormikErrors } from 'formik';

import { TranslateFunction } from '@restapp/i18n-client-react';
import ClientModule from '@restapp/module-client-react-native';

import signUp from './signUp/index.native';
import users from './users/index.native';
import profile from './profile/index.native';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent.native';
import UserScreenNavigator from './containers/UserScreenNavigator.native';

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
export interface NavigationOptionsProps {
  navigation?: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export interface CommonProps extends NavigationOptionsProps {
  t?: TranslateFunction;
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
  onSubmit: (values: V) => Promise<void> | void | any;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t?: TranslateFunction;
}

export const ref: { navigator: NavigationContainer } = {
  navigator: null
};

const MainScreenNavigator = () => {
  const Navigator = ref.navigator;
  return <Navigator />;
};

export default new ClientModule(signUp, profile, users, {
  localization: [{ ns: 'user', resources }],
  router: <MainScreenNavigator />,
  dataRootComponent: [DataRootComponent],
  onAppCreate: [(module: ClientModule) => (ref.navigator = UserScreenNavigator(module.drawerItems))]
});
