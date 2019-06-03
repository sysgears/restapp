import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Loading } from '@restapp/look-client-react-native';
import filesize from 'filesize';
import { UploadNativeViewProps } from '../types';

export default class UploadView extends React.Component<UploadNativeViewProps> {
  public renderFileInfo = ({ item: { id, name, path, size } }: any) => {
    const { handleRemoveFile, handleDownloadFile, downloadingFiles } = this.props;
    const icon = downloadingFiles.some((fileId: number) => fileId === id) ? (
      <ActivityIndicator style={styles.icon} size="small" color="#3B5998" />
    ) : (
      <TouchableOpacity style={styles.icon} onPress={() => handleDownloadFile(path, name, id)}>
        <FontAwesome name="download" size={20} style={{ color: '#3B5998' }} />
      </TouchableOpacity>
    );

    return (
      <View style={styles.fileWrapper}>
        <Text style={styles.text}>
          {name} ({filesize(size)})
        </Text>
        <View style={{ ...styles.iconWrapper }}>
          {icon}
          <TouchableOpacity style={styles.icon} onPress={() => handleRemoveFile(id)}>
            <FontAwesome name="trash" size={20} style={{ color: '#3B5998' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  public render() {
    const { files, t, loading, handleUploadNativeFiles, downloadingFiles, error } = this.props;
    if (loading) {
      return <Loading text={t('loading')} />;
    }

    if (error) {
      return (
        <View style={styles.alertTextWrapper}>
          <Text style={styles.alertText}>{error}</Text>
        </View>
      );
    }

    return files ? (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleUploadNativeFiles}>
            <Text style={styles.btnText}>{t('upload.btn')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={files}
          style={styles.list}
          keyExtractor={item => `${item.id}`}
          extraData={downloadingFiles}
          renderItem={this.renderFileInfo}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  btnContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  btn: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0275d8',
    borderRadius: 10
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    flex: 1,
    fontSize: 18
  },
  iconWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 50,
    height: 50
  },
  fileWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.8,
    minHeight: 50,
    paddingLeft: 7,
    paddingRight: 7
  },
  list: {
    marginTop: 5,
    width: '100%'
  }
});
