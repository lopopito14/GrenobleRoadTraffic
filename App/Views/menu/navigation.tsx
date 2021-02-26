import React from 'react';
import { Modal, View } from 'react-native';
import { ICamera } from '../../store/initialState';
import Context, { IContextProps } from '../../store/context';
import NavigationItem from './navigationItem';
import NavigationIcon from './navigationIcon';

const Navigation = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { state } = React.useContext<IContextProps>(Context);

  function onShowModalButtonPressed() {
    setShowModal((prev) => !prev);
  }

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
        {
          state.data && state.data.map((camera: ICamera) =>
            <NavigationItem key={camera.name} camera={camera} />
          )
        }
      </Modal>
    </View>
  );
};

export default Navigation;
