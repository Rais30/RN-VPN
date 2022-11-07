/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';

import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
 VpnOptions
} from 'react-native-simple-openvpn';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const isIPhone = Platform.OS === 'ios';

const App = () => {
  useEffect(() => {
    async function observeVpn() {
      if (isIPhone) {
        await RNSimpleOpenvpn.observeState();
      }

      addVpnStateListener(e => {
        // ...
        console.log('log e =>', e);
      });
    }

    observeVpn();

    return async () => {
      if (isIPhone) {
        await RNSimpleOpenvpn.stopObserveState();
      }

      removeVpnStateListener();
    };
  });

  async function startOvpn() {
    try {
      await RNSimpleOpenvpn.connect({
        remoteAddress: '192.168.1.1 3000',
        ovpnFileName: 'client',
        assetsPath: 'ovpn/',
        providerBundleIdentifier: 'com.example.RNSimpleOvpnTest.NEOpenVPN',
        localizedDescription: 'RNSimpleOvpn',
      });
    } catch (error) {
      console.log('log Error Start ', error);
    }
  }

  async function stopOvpn() {
    try {
      await RNSimpleOpenvpn.disconnect();
      console.log('Stop VPN');
    } catch (error) {
      console.log('log Error Stop ', error);
    }
  }

  function printVpnState() {
    console.log('log ', JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
    return JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2);
  }

  return (
    <View style={styles.container}>
      <Text>{printVpnState()}</Text>
      <View style={styles.rowStyle}>
        <TouchableOpacity
          style={styles.buttonOnpress}
          onPress={() => {
            startOvpn();
          }}>
          <Text style={{fontSize: 20, color: '#ffff'}}>On</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOnpress}
          onPress={() => {
            stopOvpn();
          }}>
          <Text style={{fontSize: 20, color: '#ffff'}}>Off</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  buttonOnpress: {
    height: 50,
    width: '40%',
    borderRadius: 20,
    backgroundColor: '#33bcfc',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default App;
