import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  iconPressedHandler(): void;
  isPressed: boolean;
}

export const NavigationIcon: React.FunctionComponent<Props> = (
  props: Props,
) => {
  return (
    <View style={styles.containerStytle}>
      <TouchableOpacity onPress={() => props.iconPressedHandler()}>
        <View
          style={[
            styles.rectangle,
            {
              transform: [
                {rotate: props.isPressed ? '45deg' : '0deg'},
                {translateX: props.isPressed ? 10 : 0},
                {translateY: props.isPressed ? 10 : 0},
              ],
            },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: props.isPressed ? 'transparent' : '#767577'},
          ]}
        />
        <View
          style={[
            styles.rectangle,
            {
              transform: [
                {rotate: props.isPressed ? '-45deg' : '0deg'},
                {translateX: props.isPressed ? 10 : 0},
                {translateY: props.isPressed ? -10 : 0},
              ],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationIcon;

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
    backgroundColor: '#767577',
  },
});
