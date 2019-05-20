import * as React from 'react';
import { withFormik, FormikProps } from 'formik';
import { View, StyleSheet } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { FieldAdapter as Field } from '@restapp/forms-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { RenderField, Button, RenderSelect, RenderSwitch, FormView, primary } from '@restapp/look-client-react-native';
import { placeholderColor, submit } from '@restapp/look-client-react-native/styles';
import { email as emailRule, minLength, required, match, validate } from '@restapp/validation-common-react';

import { FormProps, User, UserRole } from '../index.native';

import settings from '../../../../settings';

interface FormikFormProps extends FormProps<FormValues> {
  initialValues: FormValues;
}

interface UserFormProps extends FormikProps<FormValues> {
  handleSubmit: () => void;
  t: TranslateFunction;
  handleChange: () => void;
  setFieldValue: (type: string, value: any) => void;
  onSubmit: (values: FormValues) => Promise<void>;
  setTouched: () => void;
  isValid: boolean;
  error: string;
  shouldDisplayRole: boolean;
  shouldDisplayActive: boolean;
  values: any;
  errors: any;
  initialValues: FormValues;
  touched: any;
}

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

type RoleChangeFunc = (
  type: string,
  value: string | string[],
  setFieldValue: (type: string, value: string) => void
) => void;

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, emailRule],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

const handleRoleChange: RoleChangeFunc = (type, value, setFieldValue) => {
  const preparedValue = Array.isArray(value) ? value[0] : value;
  setFieldValue(type, preparedValue);
};

const UserForm: React.FunctionComponent<UserFormProps> = ({
  values,
  handleSubmit,
  setFieldValue,
  t,
  shouldDisplayRole,
  shouldDisplayActive
}) => {
  const options = [
    {
      value: 'user',
      label: t('userEdit.form.field.role.user')
    },
    {
      value: 'admin',
      label: t('userEdit.form.field.role.admin')
    }
  ];
  const { username, email, role, isActive, firstName, lastName, password, passwordConfirmation } = values;
  return (
    <FormView contentContainerStyle={{ flexGrow: 1 }} style={styles.formView}>
      <View style={styles.formContainer}>
        <Field
          placeholder={t('userEdit.form.field.name')}
          name="username"
          component={RenderField}
          type="text"
          value={username}
          placeholderTextColor={placeholderColor}
        />
        <Field
          name="email"
          component={RenderField}
          placeholder={t('userEdit.form.field.email')}
          value={email}
          keyboardType="email-address"
          placeholderTextColor={placeholderColor}
        />
        {shouldDisplayRole && (
          <Field
            name="role"
            component={RenderSelect}
            label={t('userEdit.form.field.role.label')}
            okText={t('userEdit.select.okText')}
            dismissText={t('userEdit.select.dismissText')}
            placeholderTextColor={placeholderColor}
            selectedValue={role}
            onChange={(value: string) => handleRoleChange('role', value, setFieldValue)}
            cols={1}
            data={options}
          />
        )}
        {shouldDisplayActive && (
          <Field
            name="isActive"
            label={t('userEdit.form.field.active')}
            onChange={() => setFieldValue('isActive', !isActive)}
            component={RenderSwitch}
            placeholder={t('userEdit.form.field.active')}
            checked={isActive}
            placeholderTextColor={placeholderColor}
          />
        )}
        <Field
          name="firstName"
          component={RenderField}
          placeholder={t('userEdit.form.field.firstName')}
          placeholderTextColor={placeholderColor}
          label={t('userEdit.form.field.firstName')}
          value={firstName}
        />

        <Field
          name="lastName"
          component={RenderField}
          placeholder={t('userEdit.form.field.lastName')}
          placeholderTextColor={placeholderColor}
          value={lastName}
        />
        <Field
          name="password"
          secureTextEntry={true}
          component={RenderField}
          type="password"
          placeholder={t('userEdit.form.field.pass')}
          placeholderTextColor={placeholderColor}
          value={password}
        />
        <Field
          name="passwordConfirmation"
          component={RenderField}
          placeholder={t('userEdit.form.field.passConf')}
          placeholderTextColor={placeholderColor}
          value={passwordConfirmation}
          type="password"
          secureTextEntry={true}
        />
        <View style={styles.submit}>
          <Button type={primary} onPress={handleSubmit}>
            {t('userEdit.form.btnSubmit')}
          </Button>
        </View>
      </View>
      <KeyboardSpacer />
    </FormView>
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
  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e: any) => {
      if (e && e.errors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: 'SignUpForm ', // helps with React DevTools
  validate: values => validate(values, userFormSchema)
});

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    flex: 1
  },
  submit,
  formView: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

export default translate('user')(UserFormWithFormik(UserForm));
