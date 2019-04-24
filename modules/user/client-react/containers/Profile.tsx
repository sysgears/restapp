import React from 'react';

import ProfileView from '../components/ProfileView';

import { User } from '..';

interface ProfileProps {
  currentUser: User;
  loading: boolean;
  error: any;
}

const Profile: React.FunctionComponent<ProfileProps> = props => <ProfileView {...props} />;

export default Profile;
