import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { LayoutCenter, Card, CardGroup, CardTitle, CardText, PageLayout } from '@restapp/look-client-react';

import { User } from '../..';
import settings from '../../../../../settings';

interface ProfileViewProps {
  currentUserLoading: boolean;
  currentUser: User;
  t: TranslateFunction;
}
const renderMetaData = (t: TranslateFunction) => {
  return (
    <Helmet
      title={`${settings.app.name} - ${t('profile.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('profile.meta')}`
        }
      ]}
    />
  );
};

const ProfileView: React.FunctionComponent<ProfileViewProps> = ({ currentUserLoading, currentUser, t }) => {
  if (currentUserLoading && !currentUser) {
    return (
      <PageLayout>
        {renderMetaData(t)}
        <div className="text-center">{t('profile.loadMsg')}</div>
      </PageLayout>
    );
  } else if (currentUser) {
    return (
      <PageLayout>
        {renderMetaData(t)}
        <LayoutCenter>
          <h1 className="text-center">{t('profile.card.title')}</h1>
          <Card>
            <CardGroup>
              <CardTitle>{t('profile.card.group.name')}:</CardTitle>
              <CardText>{currentUser.username}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>{t('profile.card.group.email')}:</CardTitle>
              <CardText>{currentUser.email}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>{t('profile.card.group.role')}:</CardTitle>
              <CardText>{currentUser.role}</CardText>
            </CardGroup>
            {currentUser && currentUser.fullName && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.full')}:</CardTitle>
                <CardText>{currentUser.fullName}</CardText>
              </CardGroup>
            )}
          </Card>
          <Link className="mt-2 btn user-link" to={`/users/${currentUser.id}`}>
            {t('profile.editProfileText')}
          </Link>
        </LayoutCenter>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData(t)}
        <h2>{t('profile.errorMsg')}</h2>
      </PageLayout>
    );
  }
};

export default translate('userProfile')(ProfileView);
