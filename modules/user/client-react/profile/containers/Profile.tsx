import React from 'react';
import { connect } from 'react-redux';
import ProfileView from '../components/ProfileView';
import { User, CommonProps } from '../../types';

interface ProfileProps extends CommonProps {
  currentUser?: User;
  currentUserLoading?: boolean;
  getCurrentUser?: () => void;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ ...props }) => {
  return <ProfileView {...props} />;
};

export default connect(({ signUpReducer: { currentUser } }: any) => ({
  currentUser
}))(Profile);
