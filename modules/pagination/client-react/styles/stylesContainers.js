import { StyleSheet } from 'react-native';
import { styles as lookStyles } from '@restapp/look-client-react-native';

export default StyleSheet.create({
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
