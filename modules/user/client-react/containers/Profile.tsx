import React from 'react';
import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView';
import { User } from '..';
import { CURRENT_USER } from '../actions';

interface ProfileProps {
  currentUser: User;
  currentUserLoading: boolean;
  getCurrentUser: () => void;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ getCurrentUser, ...props }) => {
  return <ProfileView {...props} />;
};

export default connect(
  ({ currentUser: { currentUser } }: any) => ({
    currentUser
  }),
  { getCurrentUser: CURRENT_USER }
)(Profile);
