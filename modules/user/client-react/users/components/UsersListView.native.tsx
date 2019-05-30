import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import {
  Button,
  Card,
  CardItem,
  CardLabel,
  CardText,
  List,
  ListItem,
  Loading,
  primary
} from '@restapp/look-client-react-native';

import { NavigationOptionsProps, User } from '../../index.native';

interface UsersListViewProps extends NavigationOptionsProps {
  users: User[];
  deleteUser: (id: number | string) => void;
  loading: boolean;
  t: TranslateFunction;
}

const UsersListView = ({ users, loading, navigation, deleteUser, t }: UsersListViewProps) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading text={t('users.loadMsg')} />
      ) : (
        <ScrollView>
          <View>
            <View style={styles.buttonWrapper}>
              <Button type={primary} onPress={() => navigation.navigate('UserAdd')}>
                {t('users.btn.add')}
              </Button>
            </View>
            {(users && users.length && (
              <List>
                {users.map(({ username, email, isActive, role, id }, idx) => (
                  <ListItem style={styles.listItem} key={idx} onPress={() => navigation.navigate('UserEdit', { id })}>
                    <Card style={styles.cardItem}>
                      <CardItem>
                        <View style={styles.cardItem}>
                          <CardItem style={styles.cardItemWrapper}>
                            <CardLabel>{`${t('users.column.name')}: `}</CardLabel>
                            <CardText>{username}</CardText>
                          </CardItem>
                          <CardItem style={styles.cardItemWrapper}>
                            <CardLabel>{`${t('users.column.email')}: `}</CardLabel>
                            <CardText>{email}</CardText>
                          </CardItem>
                          <CardItem style={styles.cardItemWrapper}>
                            <CardLabel>{`${t('users.column.role')}: `}</CardLabel>
                            <CardText>{role}</CardText>
                          </CardItem>
                          <CardItem style={styles.cardItemWrapper}>
                            <CardLabel>{`${t('users.column.active')}: `}</CardLabel>
                            <CardText>{String(isActive)}</CardText>
                          </CardItem>
                        </View>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.iconWrapper} onPress={() => deleteUser(id)}>
                            <FontAwesome name="trash" size={25} style={{ color: '#de5251' }} />
                          </TouchableOpacity>
                        </View>
                      </CardItem>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )) || (
              <View style={styles.notificationContainer}>
                <Text style={styles.notificationText}>Users not found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    marginRight: 15,
    paddingRight: 0
  },
  cardItem: {
    flex: 9
  },
  cardItemWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  notificationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    fontSize: 24,
    fontWeight: '600'
  }
});

export default translate('userUsers')(UsersListView);
