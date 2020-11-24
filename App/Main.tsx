import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CameraList} from './Views/CamerasList';

interface Props {}

interface MainState {
  showModal: boolean;
}

export class Main extends React.Component<Props, MainState> {
  constructor(props: Props) {
    super(props);
    this.state = {showModal: false};
  }

  onShowModalButtonPressed() {
    this.setState({showModal: !this.state.showModal});
  }

  getBurgerIcon() {
    return (
      <TouchableOpacity onPress={() => this.onShowModalButtonPressed()}>
        <Image
          source={require('./Images/burger.png')}
          style={styles.burgerImage}
        />
      </TouchableOpacity>
    );
  }

  getNavigationContainer() {
    const cameraNames = [
      'Champagnier',
      'Eybens',
      'Meylan',
      'RondeauEst',
      'RondeauNord',
      'Vizille',
    ];

    const cameraSpots = cameraNames.map((cameraName: string) => {
      return (
        <View style={styles.cameraItemView} key={cameraName}>
          <Text style={styles.cameraItemViewText}>{cameraName}</Text>
          <Switch
            style={styles.cameraItemViewSwitch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={true ? '#009688' : '#f4f3f4'}
            value={true}
          />
        </View>
      );
    });

    return (
      <View>
        {this.getBurgerIcon()}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}>
          {this.getBurgerIcon()}
          {cameraSpots}
        </Modal>
      </View>
    );
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        {this.getNavigationContainer()}
        <SafeAreaView style={styles.safeAreaStyle}>
          <CameraList />
        </SafeAreaView>
      </>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  burgerImage: {
    height: 80,
    width: 80,
  },
  navigationContainerStyle: {
    maxWidth: 200,
    zIndex: -1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cameraItemView: {
    justifyContent: 'space-between',
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'row',
  },
  cameraItemViewText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
  },
  cameraItemViewSwitch: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  safeAreaStyle: {
    alignItems: 'stretch',
  },
  buttonRefreshStyle: {
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
  buttonRefreshTextStyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  cameraListStyle: {
    marginTop: 100,
  },
});
