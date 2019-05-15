import React from 'react';
import { withFormik, FormikProps } from 'formik';
import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import { required, minLength, validate, match } from '@restapp/validation-common-react';
import { Form, RenderField, Button, Alert } from '@restapp/look-client-react';
import settings from '../../../../settings';
import { CommonProps, FormProps, ResetPasswordSubmitProps } from '..';

interface ResetPasswordFormProps extends CommonProps, FormProps<ResetPasswordSubmitProps> {}

const resetPasswordFormSchema = {
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

const ResetPasswordForm: React.FunctionComponent<ResetPasswordFormProps & FormikProps<ResetPasswordSubmitProps>> = ({
  values,
  handleSubmit,
  errors,
  t
}) => (
  <Form name="resetPassword" onSubmit={handleSubmit}>
    <Field
      name="password"
      component={RenderField}
      type="password"
      label={t('resetPass.form.field.pass')}
      value={values.password}
    />
    <Field
      name="passwordConfirmation"
      component={RenderField}
      type="password"
      label={t('resetPass.form.field.passConf')}
      value={values.passwordConfirmation}
    />
    {errors && errors.message && <Alert color="error">{errors.message}</Alert>}
    <Button color="primary" type="submit">
      {t('resetPass.form.btnSubmit')}
    </Button>
  </Form>
);

const ResetPasswordFormWithFormik = withFormik<ResetPasswordFormProps, ResetPasswordSubmitProps>({
  enableReinitialize: true,
  mapPropsToValues: () => ({ password: '', passwordConfirmation: '' }),
  async handleSubmit(values, { setErrors, resetForm, props: { onSubmit } }) {
    await onSubmit(values)
      .then(() => resetForm())
      .catch((e: any) => {
        if (e && e.errors) {
          setErrors(e.errors);
        } else {
          throw e;
        }
      });
  },
  validate: values => validate(values, resetPasswordFormSchema),
  displayName: 'LoginForm' // helps with React DevTools
});

export default translate('user')(ResetPasswordFormWithFormik(ResetPasswordForm));
