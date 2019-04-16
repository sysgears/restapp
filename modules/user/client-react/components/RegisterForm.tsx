import React from 'react';
import { withFormik, FormikErrors } from 'formik';
import { isFormError, FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { match, email, minLength, required, validate } from '@restapp/validation-common-react';
import { Form, RenderField, Button, Alert } from '@restapp/look-client-react';

import { RegisterOnSubmitProps } from './RegisterView';
import settings from '../../../../settings';

const registerFormSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

interface RegisterFormProps {
  handleSubmit: (values: RegisterOnSubmitProps, props: HandleSubmitProps) => void;
  onSubmit: (values: RegisterOnSubmitProps) => Promise<void> | any;
  submitting: boolean;
  errors: any;
  values: RegisterOnSubmitProps;
  t: TranslateFunction;
}

interface HandleSubmitProps {
  setErrors: (errors: FormikErrors<RegisterOnSubmitProps>) => void;
  props: RegisterOnSubmitProps;
}

const RegisterForm = ({ values, handleSubmit, submitting, errors, t }: RegisterFormProps) => {
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

const RegisterFormWithFormik = withFormik<RegisterFormProps, RegisterOnSubmitProps>({
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
