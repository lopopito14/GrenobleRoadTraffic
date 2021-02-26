import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Constants from '../../constants';

interface IProps {
  url: string;
  key: number;
}

const CameraItem = (props: IProps) => {
  return (
    <View>
      <Video
        source={{
          uri: Constants.URL + props.url,
        }}
        style={styles.videoStyle}
        playInBackground={true}
        resizeMode="cover"
        repeat={true}
      />
    </View>
  );
}

var styles = StyleSheet.create({
  videoStyle: {
    backgroundColor: 'black',
    position: 'relative',
    height: 255,
    width: 340,
    alignSelf: 'center',
  },
});

export default CameraItem;