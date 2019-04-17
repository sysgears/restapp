import React from 'react';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';

import { match, email, minLength, required, validate } from '@restapp/validation-common-react';
import { Form, RenderField, Button, Alert } from '@restapp/look-client-react';

import { FormProps, RegisterSubmitProps } from '..';
import settings from '../../../../settings';

const registerFormSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

const RegisterForm = ({ values, handleSubmit, submitting, errors, t }: FormProps<RegisterSubmitProps>) => {
  return (
    <Form name="register" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={RenderField}
        type="text"
        label={t('reg.form.field.name')}
        value={values.username}
      />
      <Field name="email" component={RenderField} type="text" label={t('reg.form.field.email')} value={values.email} />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('reg.form.field.pass')}
        value={values.password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t('reg.form.field.passConf')}
        value={values.passwordConfirmation}
      />
      <div className="text-center">
        {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
        <Button color="primary" type="submit" disabled={submitting}>
          {t('reg.form.btnSubmit')}
        </Button>
      </div>
    </Form>
  );
};

const RegisterFormWithFormik = withFormik<FormProps<RegisterSubmitProps>, RegisterSubmitProps>({
  mapPropsToValues: () => ({ username: '', email: '', password: '', passwordConfirmation: '' }),
  validate: values => validate(values, registerFormSchema),
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e: any) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: 'SignUpForm' // helps with React DevTools
});

export default translate('user')(RegisterFormWithFormik(RegisterForm));
