import React, {useContext} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {ICamera} from '../../Store/initialState';
import Context from '../../Store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  key: string;
  camera: ICamera;
}

export const NavigationItem: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const {dispatch} = useContext(Context);

  function onSwitchValueChanged(value: boolean) {
    // AsyncStorage.setItem(props.camera.name, value ? 'true' : 'false').then(
    //   () => {
    //     dispatch({
    //       type: 'UPDATE_SHOW_STATUS',
    //       key: props.camera.name,
    //       value: value,
    //     });
    //   },
    // );
    dispatch({
      type: 'UPDATE_SHOW_STATUS',
      key: props.camera.name,
      value: value,
    });
    AsyncStorage.setItem(
      props.camera.name,
      value ? 'true' : 'false',
    ).then(() => {});
  }

  return (
    <View style={styles.cameraItemView} key={props.camera.name}>
      <Text style={styles.cameraItemViewText}>{props.camera.name}</Text>
      <Switch
        style={styles.cameraItemViewSwitch}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={props.camera.show ? '#009688' : '#f4f3f4'}
        value={props.camera.show}
        key={props.camera.name}
        onValueChange={(value) => onSwitchValueChanged(value)}
      />
    </View>
  );
};

export default NavigationItem;

const styles = StyleSheet.create({
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
});
