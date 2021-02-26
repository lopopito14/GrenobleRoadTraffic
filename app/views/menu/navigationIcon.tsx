import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Constants from '../../constants';

interface IProps {
  iconPressedHandler(): void;
  isPressed: boolean;
}

const NavigationIcon = (props: IProps) => {

  const rectangleTransforms: any = (up: boolean) => {
    return [
      { rotate: props.isPressed ? (up ? '45deg' : '-45deg') : '0deg' },
      { translateX: props.isPressed ? 10 : 0 },
      { translateY: props.isPressed ? (up ? 10 : -10) : 0 },
    ]
  };

  return (
    <View style={styles.containerStytle}>
      <TouchableOpacity onPress={() => props.iconPressedHandler()}>
        <View
          style={[
            styles.rectangle,
            {
              transform: rectangleTransforms(true)
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { backgroundColor: props.isPressed ? 'transparent' : Constants.GRAY },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              transform: rectangleTransforms(false)
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStytle: {
    marginLeft: 10,
    marginTop: 10,
  },
  rectangle: {
    height: 5,
    width: 50,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: Constants.GRAY,
  },
});

export default NavigationIcon;