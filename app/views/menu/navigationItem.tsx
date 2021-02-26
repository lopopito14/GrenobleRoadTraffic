import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { ICamera } from '../../store/initialState';
import Context from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';

interface IProps {
  key: string;
  camera: ICamera;
}

const NavigationItem = (props: IProps) => {
  const { dispatch } = useContext(Context);

  const onSwitchValueChanged = React.useCallback(async (value: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_STATUS',
      key: props.camera.name,
      value: value,
    });

    try {
      await AsyncStorage.setItem(props.camera.name, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <View style={styles.cameraItemView} key={props.camera.name}>
      <Text style={styles.cameraItemViewText}>{props.camera.name}</Text>
      <Switch
        style={styles.cameraItemViewSwitch}
        trackColor={{ false: Constants.GRAY, true: Constants.DARK_CYAN }}
        thumbColor={'#f4f3f4'}
        value={props.camera.show}
        key={props.camera.name}
        onValueChange={(value) => onSwitchValueChanged(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraItemView: {
    justifyContent: 'space-between',
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  cameraItemViewText: {
    fontSize: 18,
    color: Constants.GRAY,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
  },
  cameraItemViewSwitch: {
    alignSelf: 'center',
  },
});

export default NavigationItem;