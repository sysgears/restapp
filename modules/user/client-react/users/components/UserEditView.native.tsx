import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Loading } from '@restapp/look-client-react-native';

import UserForm from './UserForm';
import { User } from '../../index.native';

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

interface UserEditViewProps {
  loading: boolean;
  user: User;
  currentUser: User;
  t: TranslateFunction;
  onSubmit: (values: FormValues) => Promise<void>;
}

class UserEditView extends React.PureComponent<UserEditViewProps> {
  public render() {
    const { loading, user, t, currentUser } = this.props;
    if (loading && !user) {
      return <Loading text={t('userEdit.loadMsg')} />;
    } else {
      const isNotSelf = !user || (user && user.id !== currentUser.id);
      return (
        <View style={styles.container}>
          <UserForm
            onSubmit={this.props.onSubmit}
            shouldDisplayRole={isNotSelf}
            shouldDisplayActive={isNotSelf}
            initialValues={user || {}}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default translate('userUsers')(UserEditView);
