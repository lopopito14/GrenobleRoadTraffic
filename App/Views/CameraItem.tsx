import React from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import Constants from '../Models/Constants';

interface Props {
  url: string;
  key: number;
}

export class CameraVideo extends React.Component<Props> {
  render() {
    return (
      <>
        <View>
          <Video
            source={{
              uri: Constants.URL + this.props.url,
            }}
            style={styles.videoStyle}
            playInBackground={true}
            resizeMode="cover"
            repeat={true}
          />
        </View>
      </>
    );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  videoStyle: {
    backgroundColor: 'black',
    position: 'relative',
    height: 255,
    width: 340,
    alignSelf: 'center',
  },
});
