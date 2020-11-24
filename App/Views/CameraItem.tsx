import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import Constants from '../Models/Constants';
import {Camera} from './CamerasList';

interface Props {
  Camera: Camera;
  key: string;
}

export class CameraItem extends React.Component<Props> {
  onBuffer() {
    console.log('onbuffer error');
  }

  videoError() {
    console.log('videoError');
  }

  getFormattedDatetime(): string {
    var date = new Date(Number.parseInt(this.props.Camera.time, 10) * 1000);
    var formattedDate = date.toUTCString();

    return formattedDate;
  }

  render() {
    return (
      <>
        <View>
          <Text>{this.props.Camera.name}</Text>
          <Text>{this.getFormattedDatetime()}</Text>
          <Video
            source={{
              uri: Constants.URL + this.props.Camera.url,
            }}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            style={styles.backgroundVideo}
            playInBackground={true}
            resizeMode="cover"
          />
        </View>
      </>
    );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: 'black',
    position: 'relative',
    height: 200,
    width: 300,
  },
});
