import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withFormik } from 'formik';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import { RenderField, Button, primary, FormView } from '@restapp/look-client-react-native';
import { placeholderColor, submit } from '@restapp/look-client-react-native/styles';
import { match, email, minLength, required, validate } from '@restapp/validation-common-react';

import settings from '../../../../../settings';

import { FormProps } from '../../index.native';
import { RegisterSubmitProps } from '../index.native';

interface RegisterProps extends FormProps<RegisterSubmitProps> {
  valid: string;
}

const registerFormSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

const RegisterForm = ({ values, handleSubmit, t, valid }: RegisterProps) => {
  return (
    <FormView contentContainerStyle={{ flexGrow: 1 }} style={styles.formView}>
      <View style={styles.formContainer}>
        <Field
          name="username"
          component={RenderField}
          type="text"
          placeholder={t('reg.form.field.name')}
          value={values.username}
          placeholderTextColor={placeholderColor}
        />
        <Field
          name="email"
          component={RenderField}
          type="email"
          placeholder={t('reg.form.field.email')}
          value={values.email}
          keyboardType="email-address"
          placeholderTextColor={placeholderColor}
        />
        <Field
          name="password"
          component={RenderField}
          type="password"
          placeholder={t('reg.form.field.pass')}
          value={values.password}
          secureTextEntry={true}
          placeholderTextColor={placeholderColor}
        />
        <Field
          name="passwordConfirmation"
          component={RenderField}
          type="password"
          placeholder={t('reg.form.field.passConf')}
          value={values.passwordConfirmation}
          secureTextEntry={true}
          placeholderTextColor={placeholderColor}
        />
        <View style={styles.submit}>
          <Button type={primary} onPress={handleSubmit} disable={valid}>
            {t('reg.form.btnSubmit')}
          </Button>
        </View>
        <KeyboardSpacer />
      </View>
    </FormView>
  );
};

const RegisterFormWithFormik = withFormik<RegisterProps, RegisterSubmitProps>({
  mapPropsToValues: () => ({ username: '', email: '', password: '', passwordConfirmation: '' }),
  validate: values => validate(values, registerFormSchema),
  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e: any) => {
      if (e && e.errors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: 'SignUpForm' // helps with React DevTools
});

const styles = StyleSheet.create({
  submit,
  formView: {
    flex: 1,
    alignSelf: 'stretch'
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  }
});

export default translate('userSignUp')(RegisterFormWithFormik(RegisterForm));
