import React from 'react';
import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView.native';
import { UserModuleState } from '../reducers';
import { User, NavigationOptionsProps } from '../index.native';

interface ProfileProps extends NavigationOptionsProps {
  currentUser?: User;
  currentUserLoading?: boolean;
  error?: any;
}

const Profile: React.FunctionComponent<ProfileProps> = props => <ProfileView {...props} />;

export default connect(({ currentUser, loading }: UserModuleState) => ({
  currentUser,
  currentUserLoading: loading
}))(Profile);
