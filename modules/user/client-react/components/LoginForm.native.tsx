import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { RenderField, Button, primary, FormView } from '@restapp/look-client-react-native';
import { placeholderColor, submit } from '@restapp/look-client-react-native/styles';
import { required, minLength, validate } from '@restapp/validation-common-react';
import { LinkedInButton, GoogleButton, GitHubButton, FacebookButton } from '@restapp/authentication-client-react';

import { FormProps, LoginSubmitProps, NavigationOptionsProps } from '../index.native';
import settings from '../../../../settings';

interface SocialButtons {
  buttonsLength: number;
  t: TranslateFunction;
}

interface LoginForm extends FormProps<LoginSubmitProps> {
  valid: string;
}

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(settings.auth.password.minLength)]
};
const { github, facebook, linkedin, google } = settings.auth.social;

const renderSocialButtons = ({ buttonsLength, t }: SocialButtons) => {
  const type: string = buttonsLength > 2 ? 'icon' : 'button';
  const containerStyle: ViewStyle =
    buttonsLength > 2 ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } : {};

  return buttonsLength > 0 ? (
    <View style={containerStyle}>
      {facebook.enabled && <FacebookButton text={t('login.fbBtn')} type={type} />}
      {google.enabled && <GoogleButton text={t('login.googleBtn')} type={type} />}
      {github.enabled && <GitHubButton text={t('login.githubBtn')} type={type} />}
      {linkedin.enabled && <LinkedInButton text={t('login.linkedinBtn')} type={type} />}
    </View>
  ) : null;
};

const LoginForm = <P extends LoginForm & NavigationOptionsProps>({ handleSubmit, valid, values, navigation, t }: P) => {
  const buttonsLength = [facebook.enabled, linkedin.enabled, google.enabled, github.enabled].filter(button => button)
    .length;
  return (
    <FormView contentContainerStyle={{ flexGrow: 1 }} style={styles.formView}>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View>
            <View>
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                name="usernameOrEmail"
                component={RenderField}
                type="text"
                keyboardType="email-address"
                placeholder={t('mobile.login.usernameOrEmail.placeholder')}
                placeholderTextColor={placeholderColor}
                value={values.usernameOrEmail}
              />
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                name="password"
                component={RenderField}
                type="password"
                secureTextEntry={true}
                placeholder={t('mobile.login.pass.placeholder')}
                placeholderTextColor={placeholderColor}
                value={values.password}
              />
            </View>
            <View style={styles.submit}>
              <Button type={primary} onPress={handleSubmit} disabled={valid}>
                {t('login.form.btnSubmit')}
              </Button>
            </View>
            {renderSocialButtons({ buttonsLength, t })}
            <View style={styles.buttonsGroup}>
              <Text style={styles.signUpText} onPress={() => navigation.navigate('ForgotPassword')}>
                {t('login.btn.forgotPass')}
              </Text>
            </View>
            <KeyboardSpacer />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Text style={styles.text}>{t('login.notRegText')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>{t('login.btn.sign')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FormView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1
  },
  formView: {
    flex: 1,
    alignSelf: 'stretch'
  },
  form: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 9
  },
  submit,
  buttonsGroup: {
    flex: 1,
    paddingTop: 10
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 14,
    color: '#bcb8b8'
  },
  signUpText: {
    fontSize: 16,
    paddingLeft: 3,
    color: '#8e908c',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});

const LoginFormWithFormik = withFormik<LoginForm & NavigationOptionsProps, LoginSubmitProps>({
  enableReinitialize: true,
  mapPropsToValues: () => ({ usernameOrEmail: '', password: '' }),

  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e: any) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, loginFormSchema),
  displayName: 'LoginForm' // helps with React DevTools
});

export default translate('user')(LoginFormWithFormik(LoginForm));
