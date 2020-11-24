import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CameraList} from './Views/CamerasList';

interface Props {}

interface MainState {
  refresh: boolean;
}

export class Main extends React.Component<Props, MainState> {
  constructor(props: Props) {
    super(props);
    this.state = {refresh: false};
  }

  onButtonPressed() {
    this.setState({refresh: !this.state.refresh});
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeAreaStyle}>
          <TouchableOpacity
            onPress={() => this.onButtonPressed()}
            style={styles.buttonRefreshContainer}>
            <Text style={styles.buttonRefreshText}>Refresh</Text>
          </TouchableOpacity>
          <CameraList refresh={!this.state.refresh} />
        </SafeAreaView>
      </>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  safeAreaStyle: {
    alignItems: 'stretch',
  },
  buttonRefreshContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    marginTop: 20,
    height: 45,
    width: 120,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonRefreshText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  loadingIndicator: {
    color: '#009688',
  },
});
