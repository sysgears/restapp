import React from 'react';
import { StyleSheet, View } from 'react-native';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import UserForm from './UserForm';
import { User } from '../../types';

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

interface UserAddViewProps {
  t: TranslateFunction;
  onSubmit: (values: FormValues) => Promise<void>;
}

class UserAddView extends React.PureComponent<UserAddViewProps> {
  public render() {
    return (
      <View style={styles.container}>
        <UserForm
          onSubmit={this.props.onSubmit}
          initialValues={{}}
          shouldDisplayRole={true}
          shouldDisplayActive={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default translate('userUsers')(UserAddView);
