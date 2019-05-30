import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Card, CardItem, CardText, CardHeader, CardLabel, Loading } from '@restapp/look-client-react-native';
import { linkText } from '@restapp/look-client-react-native/styles';

import { NavigationOptionsProps, User } from '../../index.native';

interface ProfileViewProps extends NavigationOptionsProps {
  currentUserLoading: boolean;
  currentUser: User;
  t: TranslateFunction;
}

type ProfileItemProps = (title: string, value: string, idx: number) => JSX.Element;

const renderProfileItem: ProfileItemProps = (title, value, idx) => (
  <CardItem key={idx}>
    <CardLabel>{`${title}: `}</CardLabel>
    <CardText>{value}</CardText>
  </CardItem>
);

const ProfileView: React.FunctionComponent<ProfileViewProps> = ({ currentUserLoading, currentUser, navigation, t }) => {
  const profileItems = currentUser
    ? [
        {
          label: `${t('profile.card.group.name')}`,
          value: currentUser.username
        },
        {
          label: `${t('profile.card.group.email')}`,
          value: currentUser.email
        },
        {
          label: `${t('profile.card.group.role')}`,
          value: currentUser.role
        }
      ]
    : [];

  if (currentUser && currentUser.fullName) {
    profileItems.push({ label: `${t('profile.card.group.full')}`, value: currentUser.fullName });
  }

  return (
    <View style={styles.container}>
      {currentUserLoading ? (
        <Loading text={t('profile.loadMsg')} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardWrapper}>
            <Card>
              <CardHeader title={t('profile.headerText')} />
              {profileItems.map((item, idx) => renderProfileItem(item.label, item.value, idx))}
            </Card>
          </View>
          <TouchableOpacity
            style={styles.linkWrapper}
            onPress={() => navigation.navigate('ProfileEdit', { id: currentUser.id })}
          >
            <Text style={styles.linkText}>{t('profile.editProfileText')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  container: {
    flex: 1
  },
  cardWrapper: {
    marginBottom: 15
  },
  linkWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText
});

export default translate('userProfile')(ProfileView);
