import React, {useState, useEffect} from 'react';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const useNetInfo = () => {
  const [netConnected, setNetConnected] = useState(true);
  const [toggleNetState, setToggle] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetConnected(state.isConnected);
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setToggle(!state.isConnected);
      }, 1000);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return [netConnected, toggleNetState];
};

export default useNetInfo;
