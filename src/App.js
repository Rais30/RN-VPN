// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, {useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Platform,
//   TouchableOpacity,
//   Button,
// } from 'react-native';

// import RNSimpleOpenvpn, {
//   addVpnStateListener,
//   removeVpnStateListener,
// } from 'react-native-simple-openvpn';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const isIPhone = Platform.OS === 'ios';

// const App = () => {
//   useEffect(() => {
//     async function observeVpn() {
//       if (isIPhone) {
//         await RNSimpleOpenvpn.observeState();
//       }

//       addVpnStateListener(e => {
//         // ...
//         console.log('log e =>', e);
//       });
//     }

//     observeVpn();

//     return async () => {
//       if (isIPhone) {
//         await RNSimpleOpenvpn.stopObserveState();
//       }

//       removeVpnStateListener();
//     };

//   });

//   async function startOvpn() {
//     try {
//       await RNSimpleOpenvpn.connect({
//         remoteAddress: '198.27.69.198',
//         ovpnFileName: 'vpnbook-ca198-tcp80',
//         assetsPath: './assets/VPNBook.com-OpenVPN-CA198/',
//         // providerBundleIdentifier: 'com.example.RNSimpleOvpnTest.NEOpenVPN',
//         // localizedDescription: 'RNSimpleOvpn',
//       });
//     } catch (error) {
//       console.log('log Error Start ', error);
//     }
//   }

//   async function stopOvpn() {
//     try {
//       await RNSimpleOpenvpn.disconnect();
//       console.log('Stop VPN');
//     } catch (error) {
//       console.log('log Error Stop ', error);
//     }
//   }

//   function printVpnState() {
//     console.log('log ', JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
//     return JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2);
//   }

//   return (
//     <View style={styles.container}>
//       <Text>{printVpnState()}</Text>
//       <View style={styles.rowStyle}>
//         <TouchableOpacity
//           style={styles.buttonOnpress}
//           onPress={() => {
//             startOvpn();
//           }}>
//           <Text style={{fontSize: 20, color: '#ffff'}}>On</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.buttonOnpress}
//           onPress={() => {
//             stopOvpn();
//           }}>
//           <Text style={{fontSize: 20, color: '#ffff'}}>Off</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//   },
//   buttonOnpress: {
//     height: 50,
//     width: '40%',
//     borderRadius: 20,
//     backgroundColor: '#33bcfc',
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rowStyle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
// });

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Platform, View, ScrollView, Text, Button } from 'react-native';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';

const isIPhone = Platform.OS === 'ios';
const PRIMARY_COLOR = 'skyblue';

const App = () => {
  const [log, setLog] = useState('');
  const logScrollView = useRef(null);

  useEffect(() => {
    async function observeVpn() {
      if (isIPhone) {
        await RNSimpleOpenvpn.observeState();
      }

      addVpnStateListener((e) => {
        updateLog(JSON.stringify(e), undefined, 2);
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
        remoteAddress: '',
        ovpnFileName: 'Russian', // Japan or Russian (android assets folder)
        assetsPath: '',
        notificationTitle: 'Vpn May Rais',
        compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
        providerBundleIdentifier: 'com.your.network.extension.bundle.id',
        localizedDescription: 'TestRNSimpleOvpn',
      });
    } catch (error) {
      updateLog(error);
    }
  }

  async function stopOvpn() {
    try {
      await RNSimpleOpenvpn.disconnect();
    } catch (error) {
      updateLog(error);
    }
  }

  function printVpnState() {
    updateLog(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
  }

  function updateLog(newLog) {
    const now = new Date().toLocaleTimeString();
    setLog(`${log}\n[${now}] ${newLog}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <Button title="Connect" color={PRIMARY_COLOR} onPress={startOvpn} />
        <Button title="Disconnect" color={PRIMARY_COLOR} onPress={stopOvpn} />
        <Button title="Vpn State" color={PRIMARY_COLOR} onPress={printVpnState} />
        <Button title="Clean Log" color={PRIMARY_COLOR} onPress={() => setLog('')} />
      </View>
      <View style={styles.logContainer}>
        <ScrollView
          ref={logScrollView}
          style={styles.logScroll}
          onContentSizeChange={() => logScrollView.current.scrollToEnd({ animted: true })}
        >
          <Text>{log}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
  },
  btnContainer: {
    width: '80%',
    height: '25%',
    justifyContent: 'space-between',
  },
  logContainer: {
    width: '80%',
    height: '50%',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
  },
  logScroll: {
    flex: 1,
  },
});

export default App;

