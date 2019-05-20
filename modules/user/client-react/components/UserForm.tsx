import * as React from 'react';
import { withFormik, FormikProps } from 'formik';
import { isEmpty } from 'lodash';
import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate } from '@restapp/i18n-client-react';
import { email as emailRule, minLength, required, match, validate } from '@restapp/validation-common-react';
import { Form, RenderField, RenderSelect, RenderCheckBox, Option, Button, Alert } from '@restapp/look-client-react';

import settings from '../../../../settings';

import { CommonProps, FormProps, User, UserRole, ResetPasswordSubmitProps } from '..';

interface FormikFormProps extends FormProps<FormValues> {
  initialValues: FormValues;
}

interface UserFormProps extends CommonProps, FormikProps<FormValues> {
  handleSubmit: () => void;
  handleChange: () => void;
  setFieldValue: (name: string, value: any) => void;
  onSubmit: (values: FormValues) => Promise<void>;
  setTouched: () => void;
  isValid: boolean;
  shouldDisplayRole: boolean;
  shouldDisplayActive: boolean;
  values: any;
  errors: any;
  initialValues: FormValues;
}

interface FormValues extends User, ResetPasswordSubmitProps {}

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, emailRule]
};

const createUserFormSchema = {
  ...userFormSchema,
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [required, match('password'), minLength(settings.auth.password.minLength)]
};

const updateUserFormSchema = {
  ...userFormSchema,
  password: minLength(settings.auth.password.minLength),
  passwordConfirmation: [match('password'), minLength(settings.auth.password.minLength)]
};

const UserForm: React.FunctionComponent<UserFormProps> = ({
  values,
  handleSubmit,
  errors,
  t,
  shouldDisplayRole,
  shouldDisplayActive
}) => {
  const { username, email, role, isActive, lastName, firstName, password, passwordConfirmation } = values;

  return (
    <Form name="user" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.name')}
        value={username}
      />
      <Field name="email" component={RenderField} type="email" label={t('userEdit.form.field.email')} value={email} />
      {shouldDisplayRole && (
        <Field
          name="role"
          component={RenderSelect}
          type="select"
          label={t('userEdit.form.field.role.label')}
          value={role}
        >
          <Option value="user">{t('userEdit.form.field.role.user')}</Option>
          <Option value="admin">{t('userEdit.form.field.role.admin')}</Option>
        </Field>
      )}
      {shouldDisplayActive && (
        <Field
          name="isActive"
          component={RenderCheckBox}
          type="checkbox"
          label={t('userEdit.form.field.active')}
          checked={!!isActive}
        />
      )}
      <Field
        name="firstName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.firstName')}
        value={firstName}
      />
      <Field
        name="lastName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.lastName')}
        value={lastName}
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.pass')}
        value={password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.passConf')}
        value={passwordConfirmation}
      />
      {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
      <Button color="primary" type="submit">
        {t('userEdit.form.btnSubmit')}
      </Button>
    </Form>
  );
};

const UserFormWithFormik = withFormik<FormikFormProps, FormValues>({
  mapPropsToValues: values => {
    const { username, email, role, isActive, firstName, lastName, ...rest } = values.initialValues;
    return {
      username,
      email,
      role: role || UserRole.user,
      isActive,
      password: '',
      passwordConfirmation: '',
      firstName,
      lastName,
      ...rest
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    await onSubmit(values).catch((e: any) => {
      if (e && e.errors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: 'SignUpForm ', // helps with React DevTools
  validate: (values, props) => {
    const schema: any = isEmpty(props.initialValues) ? createUserFormSchema : updateUserFormSchema;
    return validate(values, schema);
  }
});

export default translate('user')(UserFormWithFormik(UserForm));
