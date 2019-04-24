import React from 'react';

import ProfileView from '../components/ProfileView.native';

import { User, NavigationOptionsProps } from '../index.native';

interface ProfileProps extends NavigationOptionsProps {
  currentUser?: User;
  loading?: boolean;
  error?: any;
}

const Profile: React.FunctionComponent<ProfileProps> = props => <ProfileView {...props} />;

export default Profile;
