import React from 'react';
import { withFormik } from 'formik';
import { NavLink, Link } from 'react-router-dom';

import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { required, minLength, validate } from '@restapp/validation-common-react';
import { Form, RenderField, Alert, Button } from '@restapp/look-client-react';
import { LinkedInButton, GoogleButton, GitHubButton, FacebookButton } from '@restapp/authentication-client-react';

import settings from '../../../../../settings';
import { LoginSubmitProps } from '..';
import { FormProps } from '../../types/typings';

interface SocialButtons {
  buttonsLength: number;
  t: TranslateFunction;
}

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(8)]
};
const { github, facebook, linkedin, google } = settings.auth.social;

const renderSocialButtons = ({ buttonsLength, t }: SocialButtons) => {
  const type: string = buttonsLength > 2 ? 'icon' : 'button';
  const containerStyle =
    buttonsLength > 2 ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 200 } : {};

  return (
    <div style={containerStyle}>
      {facebook.enabled && (
        <div className="text-center">
          <FacebookButton text={t('login.fbBtn')} type={type} />
        </div>
      )}
      {google.enabled && (
        <div className="text-center">
          <GoogleButton text={t('login.googleBtn')} type={type} />
        </div>
      )}
      {github.enabled && (
        <div className="text-center">
          <GitHubButton text={t('login.githubBtn')} type={type} />
        </div>
      )}
      {linkedin.enabled && (
        <div className="text-center">
          <LinkedInButton text={t('login.linkedinBtn')} type={type} />
        </div>
      )}
    </div>
  );
};

const LoginForm = ({ handleSubmit, submitting, errors, values, t }: FormProps<LoginSubmitProps>) => {
  const buttonsLength: number = [facebook.enabled, linkedin.enabled, google.enabled, github.enabled].filter(
    button => button
  ).length;
  return (
    <Form name="login" onSubmit={handleSubmit}>
      <Field
        name="usernameOrEmail"
        component={RenderField}
        type="text"
        label={t('login.form.field.usernameOrEmail')}
        value={values.usernameOrEmail}
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('login.form.field.pass')}
        value={values.password}
      />
      <div className="text-center">{errors && errors.message && <Alert color="error">{errors.message}</Alert>}</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center">
          <Button size="lg" style={{ minWidth: '320px' }} color="primary" type="submit" disabled={submitting}>
            {t('login.form.btnSubmit')}
          </Button>
        </div>
        {renderSocialButtons({ buttonsLength, t })}
      </div>
      <div className="text-center" style={{ marginTop: 10 }}>
        <Link to="/forgot-password">{t('login.btn.forgotPass')}</Link>
      </div>
      <hr />
      <div className="text-center" style={{ marginBottom: 16 }}>
        <span style={{ lineHeight: '58px' }}>{t('login.btn.notReg')}</span>
        <NavLink className="btn btn-primary" to="/register" activeClassName="active" style={{ margin: 10 }}>
          {t('login.btn.sign')}
        </NavLink>
      </div>
    </Form>
  );
};

const LoginFormWithFormik = withFormik<FormProps<LoginSubmitProps>, LoginSubmitProps>({
  enableReinitialize: true,
  mapPropsToValues: () => ({ usernameOrEmail: '', password: '' }),

  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e: any) => {
      if (e && e.errors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, loginFormSchema),
  displayName: 'LoginForm' // helps with React DevTools
});

export default translate('userSignUp')(LoginFormWithFormik(LoginForm));
