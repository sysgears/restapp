import React from 'react';
import { withFormik, FormikProps } from 'formik';

import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import { Form, RenderField, Button, Alert } from '@restapp/look-client-react';
import { required, email, validate } from '@restapp/validation-common-react';

import { CommonProps, FormProps } from '../..';
import { ForgotPasswordSubmitProps } from '..';

interface ForgotPasswordFormProps extends CommonProps, FormProps<ForgotPasswordSubmitProps> {
  sent: boolean;
}

const forgotPasswordFormSchema = {
  email: [required, email]
};

const ForgotPasswordForm: React.FunctionComponent<ForgotPasswordFormProps & FormikProps<ForgotPasswordSubmitProps>> = ({
  handleSubmit,
  errors,
  sent,
  values,
  t
}) => {
  return (
    <Form name="forgotPassword" onSubmit={handleSubmit}>
      {sent && <Alert color="success">{t('forgotPass.form.submitMsg')}</Alert>}
      <Field
        name="email"
        component={RenderField}
        type="email"
        label={t('forgotPass.form.fldEmail')}
        value={values.email}
      />
      <div className="text-center">
        {errors && errors.message && <Alert color="error">{errors.message}</Alert>}
        <Button color="primary" type="submit">
          {t('forgotPass.form.btnSubmit')}
        </Button>
      </div>
    </Form>
  );
};

const ForgotPasswordFormWithFormik = withFormik<ForgotPasswordFormProps, ForgotPasswordSubmitProps>({
  enableReinitialize: true,
  mapPropsToValues: () => ({ email: '' }),
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
  validate: values => validate(values, forgotPasswordFormSchema),
  displayName: 'ForgotPasswordForm' // helps with React DevTools
});

export default translate('userSignUp')(ForgotPasswordFormWithFormik(ForgotPasswordForm));
