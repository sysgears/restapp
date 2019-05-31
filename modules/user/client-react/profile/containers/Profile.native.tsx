import React from 'react';
import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView.native';
import { CommonProps, User } from '../../types';

interface ProfileProps extends CommonProps {
  currentUser?: User;
  currentUserLoading?: boolean;
  error?: any;
}

const Profile: React.FunctionComponent<ProfileProps> = props => <ProfileView {...props} />;
export default connect<{}, {}, ProfileProps>(({ signUpReducer: { currentUser, loading } }: any) => ({
  currentUser,
  currentUserLoading: loading
}))(Profile);
