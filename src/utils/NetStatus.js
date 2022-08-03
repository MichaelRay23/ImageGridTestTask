import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import useNetInfo from './NetInfo';

const NetStatus = () => {
  const platform = Platform.OS;
  const [netConnected, toggleNetState] = useNetInfo();
  const text = netConnected ? 'online' : 'You are in offline';
  console.log('status:===', toggleNetState);
  return toggleNetState ? (
    <View
      style={[
        styles.container,
        {
          marginBottom: platform == 'ios' ? 16 : 0,
          backgroundColor: netConnected ? 'green' : 'red',
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  text: {color: 'white', fontSize: 15, fontWeight: 'bold'},
});

export default NetStatus;
