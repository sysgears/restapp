import { StyleSheet } from 'react-native';
import { styles as lookStyles } from '@restapp/look-client-react-native';

const viewStyles = StyleSheet.create({
  list: {
    marginTop: 5
  },
  title: {
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 0.3,
    borderTopColor: '#000',
    borderTopWidth: 0.3
  },
  pagination: {
    flex: 0.15,
    marginTop: 5
  },
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  listContainer: {
    flex: 1
  }
});

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 7
  },
  text: {
    fontSize: 16
  },
  postWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.3,
    height: 48
  },
  itemContainer: {
    flex: 0.1
  },
  itemAction: lookStyles.itemAction,
  itemTitle: lookStyles.itemTitle,
  itemSelect: {
    flex: 25
  }
});

export { viewStyles, containerStyles };
