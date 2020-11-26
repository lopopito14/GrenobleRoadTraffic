import React, {useContext, useState} from 'react';
import {Modal, Text, View} from 'react-native';
import {ICamera} from '../../Store/initialState';
import Context from '../../Store/context';
import NavigationItem from './navigationItem';
import NavigationIcon from './navigationIcon';

interface Props {}

export const Navigation: React.FunctionComponent<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {state} = useContext(Context);

  function onShowModalButtonPressed() {
    setShowModal(!showModal);
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
        <NavigationIcon
          iconPressedHandler={() => onShowModalButtonPressed()}
          isPressed={showModal}
        />
        <Modal animationType="fade" transparent={false} visible={showModal}>
          <NavigationIcon
            iconPressedHandler={() => onShowModalButtonPressed()}
            isPressed={showModal}
          />
          {cameraSpots}
        </Modal>
      </View>
    );
  }

  return <>{getNavigationContainer()}</>;
};

export default Navigation;
