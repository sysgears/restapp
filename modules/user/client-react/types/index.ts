import * as H from 'history';
import { FormikErrors } from 'formik';
import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';

import { TranslateFunction } from '@restapp/i18n-client-react';

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

export interface CommonProps extends HistoryProp, NavigationOptionsProps {
  t?: TranslateFunction;
}

export interface HistoryProp {
  history?: H.History;
}

export interface NavigationOptionsProps {
  navigation?: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export interface FormProps<V> {
  handleSubmit: (values: V, props: HandleSubmitProps<V>) => void;
  onSubmit: (values: V) => Promise<any>;
  submitting?: boolean;
  errors: Errors;
  values: V;
  t?: TranslateFunction;
}

interface HandleSubmitProps<P> {
  setErrors: (errors: FormikErrors<P>) => void;
  props: P;
}

interface Errors {
  message?: string;
}
