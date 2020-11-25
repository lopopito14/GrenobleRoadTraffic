import React, {useContext, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICamera} from '../../Store/initialState';
import Context from '../../Store/context';
import NavigationItem from './navigationItem';

interface Props {}

export const Navigation: React.FunctionComponent<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {state} = useContext(Context);

  function onShowModalButtonPressed() {
    setShowModal(!showModal);
  }

  function getBurgerIcon() {
    return (
      <TouchableOpacity onPress={() => onShowModalButtonPressed()}>
        <Image
          source={require('../../Images/burger.png')}
          style={styles.burgerImage}
        />
      </TouchableOpacity>
    );
  }

  function getNavigationContainer() {
    if (!state || !state.data) {
      return <Text>Pas de state....</Text>;
    }

    const cameraSpots = state.data.map((camera: ICamera) => {
      return <NavigationItem key={camera.name} camera={camera} />;
    });

    return (
      <View>
        {getBurgerIcon()}
        <Modal animationType="slide" transparent={false} visible={showModal}>
          {getBurgerIcon()}
          {cameraSpots}
        </Modal>
      </View>
    );
  }

  return <>{getNavigationContainer()}</>;
};

export default Navigation;

const styles = StyleSheet.create({
  burgerImage: {
    height: 80,
    width: 80,
  },
});
