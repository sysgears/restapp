import React from 'react';
import { createStackNavigator, NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';
import { FormikErrors } from 'formik';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { HeaderTitle, IconButton } from '@restapp/look-client-react-native';
import ClientModule from '@restapp/module-client-react-native';

import resources from './locales';

import Profile from './containers/Profile.native';
import ProfileEdit from './containers/ProfileEdit.native';

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
  error?: string;
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

class ProfileScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Profile'
  });
  public render() {
    return <Profile navigation={this.props.navigation} />;
  }
}

class ProfilerEditScreen extends React.Component<NavigationOptionsProps> {
  public static navigationOptions = () => ({
    title: 'Edit profile'
  });
  public render() {
    return <ProfileEdit navigation={this.props.navigation} />;
  }
}

const HeaderTitleWithI18n = translate('userProfile')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Profile: {
        screen: createStackNavigator({
          Profile: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }: NavigationOptionsProps) => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.profile" style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerForceInset: {}
            })
          },
          ProfileEdit: {
            screen: ProfilerEditScreen,
            navigationOptions: () => ({
              headerTitle: <HeaderTitleWithI18n i18nKey="navLink.editProfile" style="subTitle" />,
              headerForceInset: {}
            })
          }
        }),
        userInfo: {
          showOnLogin: true,
          role: [UserRole.user, UserRole.admin]
        },
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n i18nKey="navLink.profile" />
        }
      }
    }
  ],
  localization: [{ ns: 'userProfile', resources }]
});
