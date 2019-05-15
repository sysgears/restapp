import React from 'react';
import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView';
import { User } from '..';

interface ProfileProps {
  currentUser: User;
  currentUserLoading: boolean;
}

const Profile: React.FunctionComponent<ProfileProps> = props => {
  return <ProfileView {...props} />;
};

export default connect(({ user: { loading, currentUser } }: any) => {
  return {
    currentUser,
    currentUserLoading: loading
  };
})(Profile);
